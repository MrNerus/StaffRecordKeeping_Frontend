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
    selector: 'app-listStaff',
    styleUrl: './listStaff.component.css',
    templateUrl: './listStaff.component.html',
    standalone: true,
    imports: [IconButtonComponent, FormsModule, CommonModule],
})

export class ListStaffComponent {

    constructor(
        private route: ActivatedRoute,
        private staffService: StaffService,
        private router: Router
      ) {}

      loading: boolean = true; // Track loading state
      staffs: IStaff[] = []

    ngOnInit(): void {
        this.staffService.getStaffs().subscribe({
            next: (response: IStaff[]) => {
              this.staffs = response ?? [];
              this.loading = false;
            },
            error: (error) => {
                this.staffs = [];
                
                Swal.fire({
                    title: 'Error!',
                    text: error.error,
                    icon: 'error',
                });

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


    del(id: number) {
        this.staffService.deleteStaff(id).subscribe({
            next: (response: void) => {
                Swal.fire({
                    title: 'Deleted',
                    text: `Staff Id ${id} was deleted successfully.`,
                    icon: 'success',
                });
                this.router.navigate([this.router.url])
            },
            error: (error) => {                
                Swal.fire({
                    title: 'Error!',
                    text: error.error,
                    icon: 'error',
                });
                this.router.navigate([this.router.url])
            },
            complete: () => {}
        });
    }

};

