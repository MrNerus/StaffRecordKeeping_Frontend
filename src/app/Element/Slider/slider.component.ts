import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";

@Component({
    selector: 'app-Slider',
    styleUrl: 'slider.component.css',
    templateUrl: 'slider.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe],
    encapsulation: ViewEncapsulation.None
})

export class SliderComponent {
    @Input({ required: true }) props: Partial<ISlider> = {};
    attr_max: string = '';
    attr_min: string = '';
    attr_step: string = '';
    attr_value: string = '';
    attr_name: string = '';
    attr_id: string = '';
    attr_isReadonly: string = '';
    universal_slider: string = '';

    prop_slider: string = '0';

    ngOnInit(): void {
        this.attr_max = this.props.max != null ? `max = '${this.props.max}'` : '';
        this.attr_min = this.props.min != null ? `min = '${this.props.min}'` : '';
        this.attr_step = this.props.step != null ? `step = '${this.props.step}'` : '';
        this.attr_value = this.props.value != null ? `value = '${this.props.value}'` : '';
        this.attr_name = this.props.name != null || this.props.name != '' ? `name = '${this.props.name}'` : '';
        this.attr_id = this.props.id != null || this.props.id != '' ? `id = '${this.props.id}'` : '';
        this.attr_isReadonly = this.props.isReadonly != null || this.props.isReadonly != false ? `readonly` : '';
        this.prop_slider = this.props.value != null ? '${this.props.value}' : '0';

        this.universal_slider = `<div class="width100 flex horizontal gapHalf flexGrow flexShrinkNot">`
        this.universal_slider += `<input type="range" ${this.attr_min} ${this.attr_max} ${this.attr_value}  ${this.attr_name} ${this.attr_id} ${this.attr_isReadonly} ${this.attr_step} class="rangeSlider" onChange="this.onSlide()">`
        this.universal_slider += (this.attr_id != '' ? `<div id="sliderValue_${this.props.id != null}">${this.attr_value != ''? this.props.value : 0}</div></div>` :`</div>`)

    }

    // onSlide(): void {
    //     this.prop_slider = document.getElementById(this.props.id != null || this.props.id != '' ? this.props.id : '').value;
    //     document.getElementById(`sliderValue_` + (this.props.id != null || this.props.id != '' ? this.props.id : '')).value = this.prop_slider;
    // }
};

export interface ISlider {
    max?: Number,
    min?: Number,
    step?: Number,
    value?: Number,
    name?: string,
    id?: string,
    isReadonly?: boolean
}