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
    selector: 'app-editStaff',
    styleUrl: 'editStaff.component.css',
    templateUrl: 'editStaff.component.html',
    standalone: true,
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, CommonModule],
})

export class EditStaffComponent {
    @ViewChild('form_EditStaff') form_EditStaff!: NgForm;
    @ViewChild('c_Department') c_Department!: DropdownComponent;
    @ViewChild('c_Post') c_Post!: DropdownComponent;
    @ViewChild('c_Name') c_Name!: TextBoxComponent;
    @ViewChild('c_Salary') c_Salary!: TextBoxComponent;

    fromRoute: string = '';
    loading: boolean = true; // Track loading state

    staff: IStaff = {
        id:  -1,
        name: "No Name",
        department: 0,
        post: 0,
        salary: 0
    }

    drop_Department: IDropDown_Option[] = [
        {text: "NOT_ASSIGNED", value: "0", isDefault: false},
        {text: "ADMINISTRATION", value: "1", isDefault: false},
        {text: "SUPPORT", value: "2", isDefault: false},
        {text: "DEVELOPMENT", value: "3", isDefault: false},
        {text: "SALES_AND_MARKETING", value: "4", isDefault: false},
        {text: "ACCOUNT", value: "5", isDefault: false},
        {text: "HELPER", value: "6", isDefault: false},
        {text: "INVESTOR", value: "7", isDefault: false}
    ];
  
    drop_Post: IDropDown_Option[] = [
        {text: "NOT_ASSIGNED", value: "0", isDefault: false},
        {text: "ASISTANT", value: "1", isDefault: false},
        {text: "CSR", value: "2", isDefault: false},
        {text: "INTERN", value: "3", isDefault: false},
        {text: "LEVEL_1", value: "4", isDefault: false},
        {text: "LEVEL_2", value: "5", isDefault: false},
        {text: "LEVEL_3", value: "6", isDefault: false},
        {text: "LEVEL_4", value: "7", isDefault: false},
        {text: "LEVEL_5", value: "8", isDefault: false},
        {text: "MANAGER", value: "9", isDefault: false},
        {text: "SUPERVISOR", value: "10", isDefault: false},
        {text: "TRAINEE", value: "11", isDefault: false}
    ];

    constructor(
        private route: ActivatedRoute,
        private staffService: StaffService,
        private router: Router
    ) {}
    
    
    ngOnInit(): void {
        this.fromRoute = this.route.snapshot.paramMap.get('id') || '';
        this.loading = true;
        this.staffService.getStaff(Number.parseInt(this.fromRoute)).subscribe({
            next: (response: IStaff) => {
                this.staff.id = response.id;
                this.staff.name = response.name;
                this.staff.department = response.department;
                this.staff.post = response.post;
                this.staff.salary = response.salary;

                for (let i = 0; i < this.drop_Department.length; i++) {
                    if (this.drop_Department[i].value === response.department.toString()) {
                        this.drop_Department[i].isDefault = true;
                    }
                }
                for (let i = 0; i < this.drop_Post.length; i++) {
                    if (this.drop_Post[i].value === response.post.toString()) {
                        this.drop_Post[i].isDefault = true;
                    }
                }

                this.loading = false;
            },
            error: (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.error,
                    icon: 'error',
                })
                this.drop_Department[0].isDefault = true;

                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    navigateTo(action: string, code: string): void {
    const route = `/${action}/${code}`;
    this.router.navigateByUrl(route);
    }

    submit(): void {
        if (this.form_EditStaff.valid) {
        
            const staffData: IStaff = {
                id: this.staff.id,
                name: this.c_Name.value,
                department: Number.parseInt(this.c_Department.value),
                post: Number.parseInt(this.c_Post.value),
                salary: Number.parseFloat(this.c_Salary.value)
            };

            this.staffService.updateStaff(staffData).subscribe({
            next: (response) => {
                Swal.fire({
                    title: 'Saved',
                    text: `Staff Id ${this.staff} was updated successfully.`,
                    icon: 'success',
                });
                this.navigateTo('list','')
            },
            error: (error) => {
                Swal.fire({
                    title: 'Failed',
                    text: error.error.content,
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
            });
        }
    }

    
};

export interface IEditStaff {

}