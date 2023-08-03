import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, catchError, throwError } from 'rxjs';
import { AddEmployee } from '../models/add-employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri: string="https://localhost:7081/";
  constructor(private httpClient: HttpClient) { }
  //catch error while 
  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.uri+"api/employees")
    .pipe(
      catchError( (error:HttpErrorResponse) => {
          if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, body was: `, error.error);
          }
          // Return an observable with a user-facing error message.
          return throwError(() => new Error('Something bad happened; please try again later.'));
        }
    )
    );
  }
  

  addEmployee(employee: AddEmployee): Observable<AddEmployee>{
    return this.httpClient.post<AddEmployee>(this.uri+"api/employees", employee)
    .pipe(
      catchError( (error:HttpErrorResponse) => {
          if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, body was: `, error.error);
          }
          // Return an observable with a user-facing error message.
          return throwError(() => new Error('Something bad happened; please try again later.'));
        }
    )
    );
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
