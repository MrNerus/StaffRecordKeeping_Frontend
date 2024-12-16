import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ResearchLabService } from '../../../../Services/researchLab.service';

@Component({
    selector: 'app-WhoAmI',
    styleUrl: './WhoAmI.component.css',
    templateUrl: './WhoAmI.component.html',
    standalone: true,
    imports: [TextBoxComponent, IconButtonComponent, FormsModule, CommonModule],
})

export class WhoAmIComponent {
  @ViewChild('form_IAm') form_IAm!: NgForm;
  @ViewChild('c_Name') c_Name!: TextBoxComponent;

  name: string = "I don't Know."
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private researchLab: ResearchLabService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loading = true;
    this.researchLab.whoAmI().subscribe({
      next: (response) => {
        console.log(response)
        this.name = response.name;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
      complete() {
        this.loading = false;
      },
    });
  }

  navigateTo(action: string, code: string): void {
    const route = `ResearchLab/${action}/${code}`;
    this.router.navigateByUrl(route);
  }
};
