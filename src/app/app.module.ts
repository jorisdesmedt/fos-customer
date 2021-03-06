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
import { AngularFireModule } from 'angularfire2';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'shop',      component: ShoppingComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

const firebase = {
  piKey: "AIzaSyA19HmgnAyzvMlFnMkuOq-7AbpIsi5LLdA",
  authDomain: "fos-terminal-b7b2c.firebaseapp.com",
  databaseURL: "https://fos-terminal-b7b2c.firebaseio.com",
  projectId: "fos-terminal-b7b2c",
  storageBucket: "fos-terminal-b7b2c.appspot.com",
  messagingSenderId: "185271082136"
};

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
    ),
    AngularFireModule.initializeApp(firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
