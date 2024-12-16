import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";

@Component({
    selector: 'app-toggle',
    styleUrl: 'toggle.component.css',
    templateUrl: 'toggle.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe],
    encapsulation: ViewEncapsulation.None
})

export class ToggleComponent {
    @Input({ required: true }) props: Partial<IToggle> = {};
    @ViewChild('d_input') d_input!: ElementRef<HTMLInputElement> ;

    ngOnInit(): void {

    }

    get value(): boolean {
        return this.d_input.nativeElement.checked;
    }
    set value(value: boolean) {
        this.d_input.nativeElement.checked = value;
    }
};

export interface IToggle {
    name?: string;
    id?: string;
    isChecked?: boolean;
    isReadonly?: boolean;
}