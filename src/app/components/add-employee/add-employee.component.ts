import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  
  //properties and constructor
  constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder){}

  departments:string[] = ['IT', 'HR', 'MGM', 'FIN', 'SUPP'];

  addEmployeeRequest: AddEmployee = {
    name:'',
    email:'',
    phone:'',
    salary:87689,
    department:'',      
  }

  // profileForm = new FormGroup({
  //   name: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]),//need to check
  //   email: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(50)]),
  //   phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{10}$")]),
  //   salary: new FormControl(100000),
  //   department: new FormControl('IT')
  // });

    profileForm = this.formBuilder.group({
      name:['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      email:['', [Validators.required,Validators.email,Validators.maxLength(50)]],
      phone:['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      salary:'78000',
      department:'FIN',  
    });


  //ng on init
  ngOnInit(): void {
    
  } 
  
  //methods
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
    console.log(this.profileForm.value);
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
