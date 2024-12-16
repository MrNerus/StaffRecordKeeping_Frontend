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
    selector: 'app-viewStaff',
    styleUrl: 'viewStaff.component.css',
    templateUrl: 'viewStaff.component.html',
    standalone: true,
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, CommonModule],
})

export class ViewStaffComponent {
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

    drop_Department: IDropDown_Option[] = [ {text: "NOT_ASSIGNED", value: "0", isDefault: true} ];
    drop_Post: IDropDown_Option[] = [ {text: "NOT_ASSIGNED", value: "0", isDefault: false} ];

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
                this.drop_Department = [{text: response.department_Name, value: response.department.toString(), isDefault: true }]
                this.drop_Post = [{text: response.post_Name, value: response.post.toString(), isDefault: true }]

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
};

export interface IEditStaff {

}