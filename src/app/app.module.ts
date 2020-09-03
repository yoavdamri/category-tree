import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryTreeModule } from './modules/category-tree/category-tree.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CategoryTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
