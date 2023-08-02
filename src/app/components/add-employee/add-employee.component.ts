import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddEmployee } from 'src/app/models/add-employee.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  constructor(private employeeService: EmployeeService, 
    private router: Router){}

  addEmployeeRequest: Employee = {
    id:'',
    name:'',
    email:'',
    phone:'',
    salary:87689,
    department:'',
  
    
  }

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    salary: new FormControl(''),
    department: new FormControl(''),
  });

  ngOnInit(): void {
    
  } 

  addEmployee(){    
    
    console.log(this.addEmployeeRequest);


    this.employeeService.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next: (employee) => {
        console.log(employee);
        this.router.navigate([""]);
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

}
