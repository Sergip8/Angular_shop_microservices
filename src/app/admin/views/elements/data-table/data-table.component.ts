import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { IColumn, IProduct, TableData } from './table.data';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgClass, DataTableComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class AdminDataTableComponent {
  public products: IProduct[] = TableData.products;
  public pages: number[] = TableData.pageNumber;
  public columnData:IColumn[] = TableData.columnData
}
