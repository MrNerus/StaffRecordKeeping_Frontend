import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ResearchLabService_Counter } from '../../../../Services/researchLab_Counter.service';

@Component({
    selector: 'app-Counter',
    styleUrl: './Counter.component.css',
    templateUrl: './Counter.component.html',
    standalone: true,
    imports: [TextBoxComponent, IconButtonComponent, FormsModule, CommonModule],
})

export class CounterComponent {

  count: number = -1;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private researchLab: ResearchLabService_Counter,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loading = true;
    this.researchLab.Counter().subscribe({
      next: (response) => {
        this.count = response.counter;
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
