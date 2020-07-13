import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreationComponent } from './category/category-creation/category-creation.component';
import { CategoryEditionComponent } from './category/category-edition/category-edition.component';
import { CategoryRemoveComponent } from './category/category-remove/category-remove.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandCreationComponent } from './brand/brand-creation/brand-creation.component';
import { BrandEditionComponent } from './brand/brand-edition/brand-edition.component';


const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent
  },
  {
    path: 'category-creation',
    component: CategoryCreationComponent
  },
  {
    path: 'category-edition',
    component: CategoryEditionComponent
  },
  {
    path: 'category-remove',
    component: CategoryRemoveComponent
  },
  {
    path:'brand-list',
    component: BrandListComponent
  },
  {
    path:'brand-creation',
    component: BrandCreationComponent
  },
  {
    path:'brand-edition',
    component: BrandEditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
