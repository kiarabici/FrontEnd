import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevelopersComponent } from './developers/developers.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { DevDetailsComponent } from './dev-details/dev-details.component';
import { EditComponent } from './dev-details/edit/edit.component';
import { DeleteDeveloperComponent } from './delete-developer/delete-developer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DevelopersComponent,
    AddDeveloperComponent,
    DevDetailsComponent,
    EditComponent,
    DeleteDeveloperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
