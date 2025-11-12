import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
    constructor(
        private router: Router
    ) { }

    modalOpen = false;
    searchText = '';

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

    // toggles the professions in the professions array
    toggleProfession(profession: string, isChecked: boolean) {
        if (isChecked) {
            if (!this.filters.professions.includes(profession)) {
                this.filters.professions.push(profession);
            }
        } else {
            this.filters.professions = this.filters.professions.filter(p => p !== profession);
        }
    }

    @HostListener('document:click', ['$event'])
    handleClick(event: Event) {
        const target = event.target as HTMLElement;
        const inside = target.closest('search-bar');

        if (!inside) this.modalOpen = false;
    }

    // routes the page to the explore page with query parameters
    routeToExplore(): void {
        this.router.navigate(['/explore'], {
            queryParams: {
                genre: this.filters.genre,
                professions: this.filters.professions,
                username: this.searchText
            }
        });
    }

    // handles enter key
    handleEnter(input: HTMLInputElement): void {
        if (document.activeElement === input) {
            this.routeToExplore();
        }
    }
}
