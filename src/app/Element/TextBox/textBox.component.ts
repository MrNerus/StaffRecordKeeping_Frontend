import { Component, ElementRef, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-textBox',
    styleUrl: 'textBox.component.css',
    templateUrl: 'textBox.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe, CommonModule],
    encapsulation: ViewEncapsulation.None,
})

export class TextBoxComponent {
    @Input({ required: true }) props: Partial<ITextBox> = {};

    @ViewChild('d_input') d_input!: ElementRef<HTMLInputElement> ;


    attr_regex: string        = '';
    attr_placeholder: string  = '';
    attr_value: string        = '';
    attr_type: string         = '';
    attr_name: string         = '';
    attr_id: string           = '';
    attr_isRequired: boolean  = false;
    attr_isReadonly: boolean  = false;

    ele_icon: string         = '';
    ele_tooltip: string      = '';

    ngOnInit(): void {
        this.attr_regex       = this.props.regex != null       ? this.props.regex : '';
        this.attr_placeholder = this.props.placeholder != null ? this.props.placeholder : '';
        this.attr_value       = this.props.value != null       ? this.props.value : '';
        this.attr_type        = this.props.type != null        ? this.props.type : '';
        this.attr_name        = this.props.name != null        ? this.props.name : '';
        this.attr_id          = this.props.id != null          ? this.props.id : '';
        this.attr_isRequired  = this.props.isRequired != null;
        this.attr_isReadonly  = this.props.isReadonly != null;

        this.ele_icon        = this.props.icon != null         ? this.props.icon : '';
        this.ele_tooltip     = this.props.tooltip != null      ? this.props.tooltip : '';
    }

    get value(): string {
        return this.d_input.nativeElement.value;
    }

    set value(value: string) {
        this.d_input.nativeElement.value = value;
    }
};

export interface ITextBox {
    regex?: string,
    placeholder?: string,
    value?: string,
    type?: string,
    icon?: string,
    tooltip?: string,
    name?: string,
    id?: string,
    isRequired?: boolean,
    isReadonly?: boolean
}