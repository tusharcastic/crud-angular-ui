import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri: string="https://localhost:7081/";
  constructor(private httpClient: HttpClient) { }
  //catch error while 
  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.uri+"api/employees");
  }

  addEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(this.uri+"api/employees", employee);
  }

  editEmployee(id: string, employee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(this.uri+"api/employees/"+id,employee);
  }

  getEmployeeById(id:string): Observable<Employee>{
    return this.httpClient.get<Employee>(this.uri+"api/employees/"+id);
  }

  deleteEmployeeById(id:string):Observable<Employee>{
    return this.httpClient.delete<Employee>(this.uri+"api/employees/"+id);
  }
}
