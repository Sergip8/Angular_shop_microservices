import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FilterItem, FilterList } from "./filter-item";



@Component({
    
    selector: 'app-filter-item',
    standalone: true,
    template: `
    @for (item of data; track $index) {

      <div class="flex justify-start items-center py-2 px-5 hover:bg-gray-300 cursor-pointer" (click)="itemSelected(item)">
          @if (type) {
              <input type="radio" [checked]="isChecked(item)" name="Price" class="h-5 w-5 rounded border-gray-300" />           
          }@else {
              <input type="checkbox" [checked]="isChecked(item)" name="type[Used]" class="h-5 w-5 rounded border-gray-300" />
          }
          <span for="Used" class="ml-3 text-sm font-medium">{{item.label}}</span>
      </div>
    }
    `,
    styles: [`
        
    `],

  })
  export class FilterItemComponent {

    @Input() data!: FilterList[]
    @Input() type!: boolean
    @Output() selected = new EventEmitter<FilterList[]>()

    selectedList: FilterList[] = [];
    selectedItem: any;
  

  isChecked(itm: FilterList) {
    return this.selectedList.includes(itm)
  }
 
  itemSelected(selected: any,) {
    console.log(this.type)
    if (!this.type){
      const index = this.selectedList.indexOf(selected)
      if (index == -1)
        this.selectedList.push(selected)
      else
        this.selectedList.splice(index, 1) 
        this.selected.emit(this.selectedList)
    }
    else{
      this.selectedList = [selected]
      this.selected.emit(this.selectedList)
      console.log(this.selectedList)
    }
  }
  }