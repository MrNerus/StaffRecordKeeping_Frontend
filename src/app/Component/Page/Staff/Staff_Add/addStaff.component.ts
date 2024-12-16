import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent, IDropDown_Option } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { StaffService } from '../../../../Services/staff.service';
import { IStaff } from '../../../../Interfaces/IStaff';

@Component({
    selector: 'app-addStaff',
    styleUrl: 'addStaff.component.css',
    templateUrl: 'addStaff.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, CommonModule],
    // encapsulation: ViewEncapsulation.None
})

export class AddStaffComponent {
  @ViewChild('form_AddStaff') form_AddStaff!: NgForm;
  @ViewChild('c_Department') c_Department!: DropdownComponent;
  @ViewChild('c_Post') c_Post!: DropdownComponent;
  @ViewChild('c_Name') c_Name!: TextBoxComponent;
  @ViewChild('c_Salary') c_Salary!: TextBoxComponent;

  drop_Department: IDropDown_Option[] = [
    {text: "NOT_ASSIGNED", value: "0"},
    {text: "ADMINISTRATION", value: "1"},
    {text: "SUPPORT", value: "2"},
    {text: "DEVELOPMENT", value: "3"},
    {text: "SALES_AND_MARKETING", value: "4"},
    {text: "ACCOUNT", value: "5"},
    {text: "HELPER", value: "6"},
    {text: "INVESTOR", value: "7"}
  ];
  
  drop_Post: IDropDown_Option[] = [
    {text: "NOT_ASSIGNED", value: "0"},
    {text: "ASISTANT", value: "1"},
    {text: "CSR", value: "2"},
    {text: "INTERN", value: "3"},
    {text: "LEVEL_1", value: "4"},
    {text: "LEVEL_2", value: "5"},
    {text: "LEVEL_3", value: "6"},
    {text: "LEVEL_4", value: "7"},
    {text: "LEVEL_5", value: "8"},
    {text: "MANAGER", value: "9"},
    {text: "SUPERVISOR", value: "10"},
    {text: "TRAINEE", value: "11"}
  ];
  

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private router: Router
  ) {}


  ngOnInit(): void {}

  navigateTo(action: string, code: string): void {
    const route = `/${action}/${code}`;
    this.router.navigateByUrl(route);
  }

  submit(): void {
    if (this.form_AddStaff.valid) {
      const staffData: IStaff = {
        name: this.c_Name.value,
        department: Number.parseInt(this.c_Department.value),
        post: Number.parseInt(this.c_Post.value),
        salary: Number.parseFloat(this.c_Salary.value)
      };

      this.staffService.addStaff(staffData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Saved',
            text: `Staff was added successfully.`,
            icon: 'success',
          });
          this.navigateTo('list','')
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
