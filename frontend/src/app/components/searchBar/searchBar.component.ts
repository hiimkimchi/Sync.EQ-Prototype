import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'search-bar',
    standalone: true,
    imports: [CommonModule, NgIconComponent, RouterModule, FormsModule],
    providers: [provideIcons({ bootstrapSearch })],
    templateUrl: './searchBar.component.html',
})
export class SearchBar {
    modalOpen = false;

    filters = {
        professions: [] as string[],
        genre: ''
    };

    checkboxes = {
        producer: false,
        musician: false
    };

    openModal() {
        this.modalOpen = true;
    }

    applyFilters() {
        console.log('Filters applied:', this.filters);
        this.modalOpen = false;
    }

    toggleProfession(profession: string, isChecked: boolean) {
        if (isChecked) {
            if (!this.filters.professions.includes(profession)) {
                this.filters.professions.push(profession);
            }
        } else {
            this.filters.professions = this.filters.professions.filter(p => p !== profession);
        }

        console.log('Updated professions:', this.filters.professions);
    }

    @HostListener('document:click', ['$event'])
    handleClick(event: Event) {
        const target = event.target as HTMLElement;
        const inside = target.closest('search-bar');

        if (!inside) this.modalOpen = false;
    }
}
