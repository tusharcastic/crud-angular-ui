import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})

export class EditEmployeeComponent implements OnInit{

  

  departments:string[] = ['IT', 'HR', 'MGM', 'FIN', 'SUPP'];


  
  editEmployeeRequest: Employee = {
    name:'',
    email:'',
    phone:'',
    salary:0,
    department:'',
    id:''
  }
  profileFormEdit:any = this.formBuilder.group({  
    id:'',    
    name:['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    email:['', [Validators.required,Validators.email,Validators.maxLength(50)]],
    phone:['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
    salary:'',
    department:'', 
  });

  // profileFormEdit = new FormGroup({
  //   name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
  //   email: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(50)]),
  //   phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{10}$")]),
  //   salary: new FormControl(0, [Validators.min(0)]),
  //   department: new FormControl('FIN')
  // });

  constructor(private employeeService: EmployeeService,
     private route: ActivatedRoute,
     private router:Router,
     private formBuilder:FormBuilder){}

  
     

 ngOnInit(): void {
  console.log(this.route.paramMap);
     this.route.paramMap.subscribe({
        next: (params) => {
          console.log(this.route.toString());
          const id = params.get('id');
          if(id){
            this.employeeService.getEmployeeById(id)
            .subscribe(
              (response) => {
                this.editEmployeeRequest = response;
                console.log(this.editEmployeeRequest);
                this.profileFormEdit.setValue({
                  id:this.editEmployeeRequest.id,
                  name: this.editEmployeeRequest.name,
                  email:this.editEmployeeRequest.email,
                  phone: this.editEmployeeRequest.phone,
                  salary:this.editEmployeeRequest.salary,
                  department:this.editEmployeeRequest.department
                });
                // this.profileFormEdit.patchValue({
                //   name: this.editEmployeeRequest.name,
                //   email:this.editEmployeeRequest.email,
                //   phone: this.editEmployeeRequest.phone,
                //   salary:0,
                //   department:this.editEmployeeRequest.department
                // })
              }
            );
          }
        }   
     });
 }


 getControl():any{
  return this.profileFormEdit['controls'];
}

 editEmployee(){
  const o: any = {};
  Object.assign(o, this.profileFormEdit.value);
  this.employeeService.editEmployee(this.editEmployeeRequest.id, o)
  .subscribe(
    (response) => {
      console.log(response);
      this.router.navigate(['']);
      // .then(()=>{
      //   window.location.reload();
      // });      
    }
  );
 }
}
