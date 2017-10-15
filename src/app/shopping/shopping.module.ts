import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent, DialogOverviewExampleDialog } from './shopping.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    AngularFireDatabaseModule,
    MatDialogModule
  ],
  declarations: [ShoppingComponent, DialogOverviewExampleDialog],
  entryComponents: [DialogOverviewExampleDialog]
})
export class ShoppingModule { }
