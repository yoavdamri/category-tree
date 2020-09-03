import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTreeComponent } from './componenets/category-tree/category-tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryViewComponent } from './componenets/category-view/category-view.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AddCategoryComponent } from './componenets/add-category/add-category.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { InputTextModule } from 'primeng/inputtext';




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
  ]
})
export class CategoryTreeModule { }
