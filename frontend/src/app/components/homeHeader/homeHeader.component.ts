import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';


@Component({
  selector: 'synceq-header',
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapSearch })],
  templateUrl: './homeHeader.component.html',
})
export class SynceqHeader {
    title = 'synceq-header';
}