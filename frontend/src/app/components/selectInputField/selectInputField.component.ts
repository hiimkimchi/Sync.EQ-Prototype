import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencil, bootstrapCheck } from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'select-input-field',
    imports: [CommonModule, FormsModule, RouterModule, NgIconComponent],
    providers: [provideIcons({ bootstrapPencil, bootstrapCheck })],
    templateUrl: './selectInputField.component.html',
})
export class SelectInputField {
    @Input() inputField: string[] = [];
    @Input() options: string[] = [];
    @Input() isTitle?: boolean = false;

    @Output() fieldUpdated = new EventEmitter<string[]>();

    isEditing = false;
    showToast = false;

    switchEdit() {
        if (this.isEditing) {
            this.fieldUpdated.emit(this.inputField);
            this.showToastBanner();
        }
        this.isEditing = !this.isEditing;
    }

    showToastBanner() {
        this.showToast = true;
        setTimeout(() => (this.showToast = false), 3000);
    }

    onSelectChange(event: Event) {
        const selected = Array.from((event.target as HTMLSelectElement).selectedOptions)
            .map(opt => opt.value);
        this.inputField = selected;
    }
}
