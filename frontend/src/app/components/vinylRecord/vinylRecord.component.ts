import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { provideIcons } from '@ng-icons/core';
import { bootstrapSearch, bootstrapHouse } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'vinyl-record',
  imports: [CommonModule, RouterModule],
  providers: [provideIcons({ bootstrapSearch, bootstrapHouse })],
  templateUrl: './vinylRecord.component.html',
})
export class VinylRecord {
    title = 'vinyl-record';
}