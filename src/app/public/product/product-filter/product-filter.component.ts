import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FilterItem, FilterList } from './filter-item';
import { FilterItemComponent } from "./product-item-filter";


const baseUrl = "http://localhost:5000/api/ProductApi"

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
  standalone: true,
  imports: [FilterItemComponent]
 
})
export class ProductFilterComponent implements OnInit {
filterSelected($event: FilterList[]) {
  console.log($event)
  this.filter.emit($event)
}
  ngOnInit(): void {
    
  }

  @Input() filterData!: FilterItem[]
  @Output() filter =  new EventEmitter<FilterList[]>()
  
}
