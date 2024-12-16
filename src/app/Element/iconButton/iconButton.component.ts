// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="icon-button flex center" [attr.data-mode]="props.mode || 'enabled'"[attr.data-type]="props.type || 'plain'">
        <span class="material-symbols-rounded flex center" *ngIf="props.icon && props.icon.trim() !== ''">{{props.icon}}</span>
        <span class="text flex center" *ngIf="props.text && props.text.trim() !== ''">{{ props.text }}</span>
    </div>
  `,
  styleUrl: './iconButton.component.css',
  imports: [CommonModule],
  inputs: ['props']
})
export class IconButtonComponent {
  @Input() props: IconButton = {
    icon: '',
    text: '',
    type: 'plain',
    color: 'primary',
    mode: 'enabled'
  };

  @Input() clickHandler: Function;

  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
  }


}

interface IconButton {
  icon?: string;
  text?: string;
  type?: 'plain' | 'capsule';
  color?: string;
  mode?: 'disabled' | 'enabled';
  // href?: string;
  // target?: string;
}

