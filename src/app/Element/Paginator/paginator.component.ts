// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";
import { IPagination } from '../../Interfaces/IPagination';
import { IconButtonComponent } from "../iconButton/iconButton.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  inputs: ['props'],
  imports: [IconButtonComponent, CommonModule],
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent {
    page_Number?: number = 1;
    max_Page?: number = 1;
    rows_Count?: number = 0;
    rows_Per_Page?: number = 20;
    total_Rows?: number = 0;

    pages: number[] = [null,null,-5,-4,-3,-2,-1,0,1,2,3,4,5,null,null]

    @Input({ required: true }) props: Partial<IPagination> = {}
    @Output() pageChange = new EventEmitter<number>();

        
    ngOnInit(): void {
        this.page_Number = this.props.page_Number ?? 1;
        this.max_Page = this.props.max_Page ?? 1;
        this.rows_Count = this.props.rows_Count ?? 0;
        this.rows_Per_Page = this.rows_Per_Page ?? 20;
        this.total_Rows = this.total_Rows ?? 0;

        this.pages = this.paginate(this.page_Number, this.max_Page);
    }


    paginate(currentPage: number, totalPages: number): number[] {
        if (totalPages <= 0) totalPages = 1;
        currentPage = Math.max(1, Math.min(currentPage, totalPages));
    
        const paginationRange = 11; 
        const sidePages = Math.floor(paginationRange / 2);

        let startPage = Math.max(1, currentPage - sidePages);
        let endPage = Math.min(totalPages, currentPage + sidePages);
    
        if (currentPage <= sidePages + 1 ) { startPage = 1; }
        else { startPage = Math.max(1, currentPage - sidePages); }
        
        if (currentPage >= totalPages - sidePages ) { endPage = totalPages; }
        else { endPage = Math.min(totalPages, currentPage + sidePages); }
    
        var pages: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    get value(): number {
        return this.page_Number;
    }

    ToFirst() {
        this.page_Number = 1;
        this.pageChange.emit(this.page_Number)
    }

    ToLast() {
        this.page_Number = this.max_Page;
        this.pageChange.emit(this.page_Number);
    }
    
    ToLeft() {
        this.page_Number = Math.max(1, this.page_Number - 1);
        this.pageChange.emit(this.page_Number);
    }
    
    ToRight() {
        this.page_Number = Math.min(this.max_Page, this.page_Number + 1);
        this.pageChange.emit(this.page_Number);
    }
    
    ToThis(num: number) {
        this.page_Number = Math.max(1, num);
        this.page_Number = Math.min(this.max_Page, num);
        this.pageChange.emit(this.page_Number);
    }
}



