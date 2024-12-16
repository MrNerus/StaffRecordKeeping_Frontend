import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, NgComponentOutlet, NgFor } from '@angular/common';

// import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropDown.component.html',
  styleUrls: ['./dropDown.component.css'],
  standalone: true,
  imports: [NgComponentOutlet, NgFor, CommonModule]
})

export class DropdownComponent {
  @Input({ required: true }) props: Partial<IDropDown> = {}
  @ViewChild('d_select') d_select!: ElementRef<HTMLSelectElement> ;
  @ViewChild('h_input') h_input!: ElementRef<HTMLInputElement> ;
  @Output() selectChange = new EventEmitter<string>();


  _props: IDropDown;

  ngOnInit(): void { 
    this._props = this.props;
  }

  get text(): string {
    var dropdown = document.getElementById(this.props.id) as HTMLSelectElement; 
    return dropdown.options[dropdown.selectedIndex].text; 
  }
  get value(): string {
    if (this._props.isReadonly) {
      return this.h_input.nativeElement.value;
    }
    return this.d_select.nativeElement.value
  }

  select_Event() {
    this.selectChange.emit(this.value);
  } 
}



export interface IDropDown {
  id?: string,
  name?: string,
  options?: IDropDown_Option[],
  allowNone?: boolean,
  isReadonly?: boolean
}

export interface IDropDown_Option {
  text?: string,
  value?: string,
  isDefault?: boolean
}