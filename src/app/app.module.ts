import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingModule } from './shopping/shopping.module';
import { WelcomeModule } from './welcome/welcome.module';
import { SettingsModule } from './settings/settings.module';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'shop',      component: ShoppingComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShoppingModule,
    WelcomeModule,
    SettingsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
