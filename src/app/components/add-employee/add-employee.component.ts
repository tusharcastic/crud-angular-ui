import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private employeeService: EmployeeService, private router: Router){}

  addEmployeeRequest: AddEmployee = {
    name:'',
    email:'',
    phone:'',
    salary:87689,
    department:'',      
  }
  profileForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{10}$")]),
    salary: new FormControl(100000),
    department: new FormControl('IT')
  });

  ngOnInit(): void {
    
  } 

  fieldValidator(s: string):boolean{
    return this.profileForm.get(s)?.invalid as boolean;
  }

  getControl():any{
    return this.profileForm['controls'];
  }

  addEmployee(){        
    //console.log(this.profileForm.value);
    //this.addEmployeeRequest = new AddEmployee(this.profileForm.value);    
    //assigning FormGroup data to any object and passing it to the addEmployee service method
    console.log(this.profileForm['controls']);
    if(this.profileForm.valid){
      const o: any = {};
      Object.assign(o, this.profileForm.value);        
      this.employeeService.addEmployee(o)
      .subscribe((response) => {
        this.router.navigate(['']);
      });
    }
    else{
      console.log('invalid');
    }
    
    
  }

}
