import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialModules],
  exports: [...MaterialModules],
})
export class MaterialModule {}
