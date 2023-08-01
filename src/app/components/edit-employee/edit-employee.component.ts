import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})

export class EditEmployeeComponent implements OnInit{
  editEmployeeRequest: Employee = {
    name:'',
    email:'',
    phone:'',
    salary:100000,
    department:'',
    id:''
  }
  constructor(private employeeService: EmployeeService,
     private route: ActivatedRoute,
     private router:Router){}
 ngOnInit(): void {
  console.log(this.route.paramMap);
     this.route.paramMap.subscribe({
        next: (params) => {
          console.log(this.route.toString());
          const id = params.get('id');
          if(id){
            this.employeeService.getEmployeeById(id)
            .subscribe({
              next: (response) => {
                this.editEmployeeRequest = response;
              },
              error: (response) => {
                console.log(response);
              }
            });
          }
        }
        
        
     });

 }



 editEmployee(){
  this.employeeService.editEmployee(this.editEmployeeRequest.id, this.editEmployeeRequest)
  .subscribe(
    {
      next: (response) => {
        this.router.navigate([''])
        .then(()=>{
          window.location.reload();
        });      
      }
    }
  );
 }

 


}
