import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencil, bootstrapCheck } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'array-input-field',
  imports: [CommonModule, NgIconComponent, FormsModule, RouterModule],
  providers: [provideIcons({ bootstrapPencil, bootstrapCheck })],
  templateUrl: './arrayInputField.component.html',
})
export class ArrayInputField {
  title = 'array-input-field';
  @Input() inputField: string[] = [];
  @Input() isTitle?: boolean = false;
  @Output() fieldUpdated = new EventEmitter<string[]>();
  isEditing = false;
  showToast = false;

  switchEdit() {
    if (this.isEditing) {
      this.fieldUpdated.emit([...this.inputField]);
      this.showToastBanner();
    }
    this.isEditing = !this.isEditing;
  }

  showToastBanner() {
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 5000);
  }

  addItem() {
    this.inputField = [...this.inputField, ''];
  }

  removeItem(i: number) {
    this.inputField = this.inputField.filter((_, index) => index !== i);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
