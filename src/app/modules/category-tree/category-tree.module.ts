import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { CategoryTreeComponent } from './componenets/category-tree/category-tree.component';
import { CategoryViewComponent } from './componenets/category-view/category-view.component';
import { AddCategoryComponent } from './componenets/add-category/add-category.component';
import { environment } from '../../../environments/environment';




@NgModule({
  declarations: [CategoryTreeComponent, AddCategoryComponent, CategoryViewComponent],
  exports: [
    CategoryTreeComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    ButtonModule,
    OverlayPanelModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    InputTextModule,
    DragDropModule
  ]
})
export class CategoryTreeModule { }
