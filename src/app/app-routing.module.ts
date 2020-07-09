import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './public/home/default/default.component';


const routes: Routes = [
  
  {
    path:'home',
    component: DefaultComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  /** this must be the last one */
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
