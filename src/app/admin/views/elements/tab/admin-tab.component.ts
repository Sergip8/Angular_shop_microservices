import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { pageTransition } from "../../../../shared/utils/animations";
import { tabItems } from "./tab-items";
import { NgwTabContents } from '../../../../shared/components/ngw-tab/ngw-tab-contents.type';
import { NgwTabComponent } from '../../../../shared/components/ngw-tab/ngw-tab.component';


@Component({
  selector: 'admin-tab',
  standalone: true,
  imports: [
    CommonModule,
    NgwTabComponent
  ],
  templateUrl: './admin-tab.component.html',
  styleUrl: './admin-tab.component.css',
  animations: [pageTransition],
})
export class AdminTabComponent {
  items: NgwTabContents[] = tabItems;
}
