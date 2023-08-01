import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  /**
   *
   */
  
  constructor(private employeeService: EmployeeService, private route: Router) {


  }

  employees: Employee[] = [];
  
  /*
  [
    {
      id: '20231',
      name: "tushar",
      email: "tush.bhoge@gmail.com",
      salary: 91000,
      department: "it",
      phone: "7089828034"
    },
    {
      id: '20232',
      name: "kunjal",
      email: "kunjal.keniya@gmail.com",
      salary: 92000,
      department: "it",
      phone: "7089828035"
    },
    {
      id: '20233',
      name: "utkarsh",
      email: "utkarsh.goswami@gmail.com",
      salary: 101000,
      department: "fin",
      phone: "7089828036"
    },
    {
      id: '20234',
      name: "Shubham",
      email: "shubham.bhake@gmail.com",
      salary: 110000,
      department: "it",
      phone: "7089828037"
    }
    

  ];
  */
 employee: Employee = {
  id: '',
      name: "",
      email: "",
      salary: 0,
      department: "",
      phone: ""
 }

  ngOnInit(): void {    
    this.employeeService.getAllEmployees()
    .subscribe({
      next: (response) => this.employees = response,
      error: (response) => console.log(response)
    });//need to check
  }

  navigateToEditEmployee(employee: Employee, id: string){
    this.route.navigate(['edit-employee', id]);
  }

  deleteEmployee(id:string){
    console.log(id);
    this.employeeService.deleteEmployeeById(id)
    .subscribe({
      next: (resp) => {
        console.log(resp);
        this.route.navigate([''])
        .then(() => {
          window.location.reload();
        });        
      },
      error: (resp) => {
        console.log(resp);
      }
    });
  }


  

}
