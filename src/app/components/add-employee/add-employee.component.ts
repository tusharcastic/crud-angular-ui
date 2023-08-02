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

  addEmployeeRequest: AddEmployee = {

    name:'',
    email:'',
    phone:'',
    salary:87689,
    department:'',
  
    
  }

  profileForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    salary: new FormControl(),
    department: new FormControl(),
  });

  ngOnInit(): void {
    
  } 

  addEmployee(){    
    
    // console.log(this.profileForm.value);
    //this.addEmployeeRequest = new AddEmployee(this.profileForm.value);

    
    //assigning FormGroup data to any object and passing it to the addEmployee service method
    const o: any = {};
    Object.assign(o, this.profileForm.value);
    

    this.employeeService.addEmployee(o)
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['']);
    })
    ;


  }

}
