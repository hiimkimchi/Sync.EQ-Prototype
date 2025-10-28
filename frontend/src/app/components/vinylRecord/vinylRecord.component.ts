import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch, bootstrapHouse } from '@ng-icons/bootstrap-icons';
import { AuthButtonComponent } from '../AuthButtonComponent/AuthButtonComponent.component';

@Component({
  selector: 'vinyl-record',
  imports: [CommonModule, NgIconComponent, RouterModule, AuthButtonComponent],
  providers: [provideIcons({ bootstrapSearch, bootstrapHouse })],
  templateUrl: './vinylRecord.component.html',
})
export class VinylRecord {
    title = 'vinyl-record';
}