import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule]
})
export class ModalComponent {
 
  //private elementRef = inject(ElementRef)
  @ViewChild('ref') refElement!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const clickedInside: boolean = this.refElement.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeModal.emit();
    }
  }
  
  @Input() show: boolean = false;
  @Input() title: string = "Modal";
  @Input() size: string = "xl:max-w-7xl";
  @Input() footer: boolean = true;
  
  
  
  
  @Output() closeModal = new EventEmitter<void>();

  onModalClose() {
    this.show = false;
    this.closeModal.emit();
  }

}
