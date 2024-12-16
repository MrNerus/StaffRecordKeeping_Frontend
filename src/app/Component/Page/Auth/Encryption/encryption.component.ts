import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from '../../../../Element/Toggle/toggle.component';
import { IEncrypt, IEncrypt_Response } from '../../../../Interfaces/IName copy';
import { AuthService } from '../../../../Services/auth.service';

@Component({
    selector: 'app-encryption',
    styleUrl: 'encryption.component.css',
    templateUrl: 'encryption.component.html',
    standalone: true,
    imports: [TextBoxComponent, IconButtonComponent, FormsModule, CommonModule, ToggleComponent],
})

export class AuthComponent {
    @ViewChild('c_ToEncrypt') c_ToEncrypt!: TextBoxComponent;
    @ViewChild('c_ToDecrypt') c_ToDecrypt!: TextBoxComponent;
    @ViewChild('c_Encrypted') c_Encrypted!: TextBoxComponent;
    @ViewChild('c_Decrypted') c_Decrypted!: TextBoxComponent;
    @ViewChild('c_IsAscci') c_IsAscci!: ToggleComponent;

    loading_Encrypted: boolean = false; // Track loading state
    loading_Decrypted: boolean = false; // Track loading state

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {}
    
    encrypt(): void {
        this.loading_Encrypted = true
        const data: IEncrypt = {
            data: this.c_ToEncrypt.value,
            isAscci: this.c_IsAscci.value
        };

        this.authService.encrypt(data).subscribe({
            next: (response: IEncrypt_Response) => {
                this.loading_Encrypted = false;
                setTimeout(() => {this.c_Encrypted.value = response.data;}, 100);  
            },
            error: (error) => {
                Swal.fire({
                title: 'Error',
                text: error.error.data,
                icon: 'error',
                })
                this.loading_Encrypted = false
            }
        });
    }

    decrypt(): void {
        this.loading_Decrypted = true
        const data: IEncrypt = {
            data: this.c_ToDecrypt.value,
            isAscci: this.c_IsAscci.value
        };

        this.authService.decrypt(data).subscribe({
            next: (response: IEncrypt_Response) => {
                this.loading_Decrypted = false;
                setTimeout(() => {this.c_Decrypted.value = response.data;}, 100);  
                
            },
            error: (error) => {
                Swal.fire({
                title: 'Error',
                text: error.error.data,
                icon: 'error',
                })
                this.loading_Decrypted = false
            }
        });
    }
    
    ngOnInit(): void {}
};

export interface IEditStaff {

}