// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Adjust as per your project structure

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new', component: AddDeveloperComponent },
  { path: 'developer/edit/:id', component: AddDeveloperComponent },
  // Other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
