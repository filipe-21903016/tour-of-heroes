import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teapot',
  templateUrl: './teapot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeapotComponent {
  constructor(public dialogRef: MatDialogRef<TeapotComponent>) {}
}
