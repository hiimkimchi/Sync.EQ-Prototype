import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencil } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'input-field',
  imports: [CommonModule, NgIconComponent, RouterModule],
  providers: [provideIcons({ bootstrapPencil })],
  templateUrl: './inputField.component.html',
})
export class InputField {
    title = 'input-field';
    @Input() inputField: string | undefined
    @Input() isTitle?: boolean = false
    isEditing: boolean = false

    switchEdit() {
      this.isEditing = !this.isEditing
    }
}