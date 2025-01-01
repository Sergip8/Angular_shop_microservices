import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, TitleCasePipe]
})
export class GenericFormComponent implements OnInit {
  @Output() res = new EventEmitter()
  @Input() data: any; // Objeto de entrada
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.buildForm(this.data);
  }

  // Construcción dinámica del formulario
  buildForm(data: any): FormGroup {
    const group: any = {};
    for (const key of Object.keys(data)) {
      if (Array.isArray(data[key])) {
        group[key] = this.fb.array(
          data[key].map((item: any) => this.buildForm(item))
        );
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        group[key] = this.buildForm(data[key]);
      } else {
        group[key] = this.fb.control(data[key]);
      }
    }
    return this.fb.group(group);
  }

  // Detectar si el objeto es simple
  isSimpleObject(data: any): boolean {
    return (
      typeof data === 'object' &&
      data !== null &&
      !Array.isArray(data) &&
      !Object.values(data).some((value) => typeof value === 'object')
    );
  }

  // Validar si un valor es un objeto
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  // Obtener claves del objeto
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // Obtener el FormArray
  getFormArray(key: string): FormArray {
    return this.formGroup.get(key) as FormArray;
  }

  // Añadir un elemento a un arreglo
  addItem(section: string): void {
    const control = this.getFormArray(section);
    control.push(this.buildForm(control.at(0).value));
  }

  // Eliminar un elemento de un arreglo
  removeItem(section: string, index: number): void {
    const control = this.getFormArray(section);
    control.removeAt(index);
  }
  // Manejo del envío del formulario
  onSubmit(): void {
    this.res.emit(this.formGroup.value)
    console.log(this.formGroup.value);
  }
}