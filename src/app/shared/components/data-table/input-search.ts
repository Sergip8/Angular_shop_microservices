import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ResultList } from "../../../admin/views/elements/product/product.component";
import { NgClass } from "@angular/common";



@Component({
    selector: 'input-search',
    standalone: true,
    imports: [
        ReactiveFormsModule, NgClass
    ],
    template: ` 
    
        <div class="relative flex content-center gap-3">
            <div>
                <input
                    [formControl]="input"
                    type="text"
                    id="table-search"
                    class="search1 block p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                />
                @if (showError) {
                    <small class="text-red-500">el valor es requerido</small>

                }
            </div>
            <ul class="flex content-center gap-3">
                @for (item of selectedItems; track $index) {
                    <li class="p-2 flex gap-3 rounded-lg dark:bg-gray-700 bg-gray-50">
                        <div>
                            {{item.value}}

                        </div>
                        <span (click)="removeItem($index)">X</span>
                    </li>

                }
            </ul>

        </div>
            @if (resultList.length>0) {
               <ul
               [ngClass]="{
              'transition ease-out duration-300 transform opacity-100 scale-100': isDropdownOpen,
              'transition ease-in duration-75 transform opacity-0 scale-0': !isDropdownOpen
            }"
                class="absolute z-20 dark:bg-gray-700 bg-gray-50 w-80">
                @for (item of resultList; track $index) {
                    <li (click)="selected($index)" class="p-4 cursor-pointer">
                        {{item.value}}
                    </li>

                }
               </ul>

            }
   
   
    `,
    styles: [`
    `]
  })
  export class InputSearchComponent implements OnInit {

    ngOnInit(): void {
        this.selectedItems = []
        if(this.itemsToUpdate.length >0){
            this.selectedItems = this.itemsToUpdate
            this.selectedList.emit(this.selectedItems)
            console.log(this.selectedItems)
        }
       
        this.input.valueChanges.pipe().subscribe( val =>{
            if(val){
                this.resultList = []
                if (val.length >= 3){
                    this.isDropdownOpen = true
                    this.inputValue.emit(val)

                }

            }
        })
    }


    selectedItems: ResultList[] = []
    input = new FormControl('');
    @Output() inputValue = new EventEmitter<string>()
    @Output() selectedList = new EventEmitter<ResultList[]>()
    isDropdownOpen = false
   

    @Input() resultList: ResultList[] = []
    @Input() itemsToUpdate: ResultList[] = []
    @Input() selectedMax: number = 0
    showError = false

    selected(index: number){
        console.log(this.selectedMax)
        this.input.patchValue("")
        this.selectedItems.push(this.resultList[index])
        if(this.selectedItems.length >=this.selectedMax)
            this.input.disable()
        else
            this.input.enable()
        this.selectedList.next(this.selectedItems)
        this.resultList = []
    }
    removeItem(index: number) {
        this.selectedItems.splice(index,this.selectedItems.length-index)
        if(this.selectedItems.length >=this.selectedMax)
            this.input.disable()
        else
            this.input.enable()
        this.selectedList.next(this.selectedItems)
        console.log(this.selectedItems.length)
        }

    confirm(){
        if(this.selectedItems.length>=1){
            this.selectedList.next(this.selectedItems)
        }else{
            this.showError = true
            setTimeout(() => {
              this.showError = false
            }, 2500);
        }
    }
    @HostListener("document:click", ["$event"])
    onClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const clickInside = target.closest(`.search1`);
      
      if (!clickInside) {
        this.isDropdownOpen = false;
      }
    }
  }