import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ResearchLabService } from '../../../../Services/researchLab.service';

@Component({
    selector: 'app-IAm',
    styleUrl: './IAm.component.css',
    templateUrl: './IAm.component.html',
    standalone: true,
    imports: [TextBoxComponent, IconButtonComponent, FormsModule, CommonModule],
})

export class IAmComponent {
  @ViewChild('form_IAm') form_IAm!: NgForm;
  @ViewChild('c_Name') c_Name!: TextBoxComponent;


  constructor(
    private route: ActivatedRoute,
    private researchLab: ResearchLabService,
    private router: Router
  ) {}


  ngOnInit(): void {}

  navigateTo(action: string, code: string): void {
    const route = `ResearchLab/${action}/${code}`;
    this.router.navigateByUrl(route);
  }

  submit(): void {
    if (this.form_IAm.valid) {
      this.researchLab.iAm(this.c_Name.value).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Ok',
            text: `You are ${this.c_Name.value}.`,
            icon: 'success',
          });
          this.navigateTo('WhoAmI','')
        },
        error: (error) => {
          Swal.fire({
            title: 'Failed',
            text: error.error,
            icon: 'error',
          })
        },
      });
    } else {
      Swal.fire({
        title: 'Nope!',
        text: 'Please enter valid data.',
        icon: 'error',
        // confirmButtonText: 'Cool'
      })
    }
  }
};
