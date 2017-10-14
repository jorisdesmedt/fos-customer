import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { WebCamComponent } from 'ng2-webcam';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [ShoppingComponent, WebCamComponent]
})
export class ShoppingModule { }
