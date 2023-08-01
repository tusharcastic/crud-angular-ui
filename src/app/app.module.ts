import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HttpClientModule } from  '@angular/common/http';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
