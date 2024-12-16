// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";

@Component({
  selector: 'app-icon-link',
  standalone: true,
  templateUrl: './iconLink.component.html',
  styleUrl: './iconLink.component.css',
  inputs: ['props'],
  imports: [SanitizeHtmlPipe],
  encapsulation: ViewEncapsulation.None
})
export class IconLinkComponent {
  attr_rhref: string = '';
  attr_href: string = '';
  attr_target: string = '';

  universal_iconLink: string = '';

  @Input({ required: true }) props: Partial<IIconLink> = {}
      
  ngOnInit(): void {
    this.attr_rhref = `routerLink="${this.props.rhref ?? '#'}"`;
    this.attr_href = `href="${this.props.rhref ?? this.props.href ?? '#'}"`;
    this.attr_target = this.props.target == "" ? '' : `target='${this.props.target}'`;
    
    this.universal_iconLink = `
      <a ${this.attr_href} ${this.attr_rhref} ${this.attr_target} class="icon-link" onClick="window.location = '${this.props.rhref ?? this.props.href ?? '#'}';">
        <span class="material-symbols-rounded">${this.props.icon}</span>
        <span>${this.props.text}</span>
      </a>`;
  }
}

export interface IIconLink {
    icon: string;
    text: string;
    href?: string;
    rhref?: string;
    target?: string;
}

