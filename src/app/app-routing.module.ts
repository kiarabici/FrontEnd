import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { DevelopersComponent } from './developers/developers.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'developers', component: DevelopersComponent },
  { path: 'add-developer', component: AddDeveloperComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
