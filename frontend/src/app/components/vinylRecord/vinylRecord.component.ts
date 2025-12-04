import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { provideIcons } from '@ng-icons/core';
import { bootstrapSearch, bootstrapHouse } from '@ng-icons/bootstrap-icons';
import { TrackListOverlay } from '../trackListOverlay/trackListOverlay.component';

@Component({
  selector: 'vinyl-record',
  imports: [CommonModule, RouterModule, TrackListOverlay],
  providers: [provideIcons({ bootstrapSearch, bootstrapHouse })],
  templateUrl: './vinylRecord.component.html',
})
export class VinylRecord {
    title = 'vinyl-record';

    @Input() isVisible = false;
    @Input() profileUsername? = '';
    @Input() isEditable? = false;
}