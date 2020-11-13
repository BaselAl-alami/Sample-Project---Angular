import { Criteria } from './../../shared/models/common/criteria';
import { environment } from './../../../environments/environment';
import { HttpService } from './../../shared/models/common/http-Service';
import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { EmployeeCriteria } from '../models/employee-criteria';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService
  implements HttpService<Employee>, Criteria<EmployeeCriteria, Employee> {
  // Endpoint URL.
  private url: string = environment.apiUrl;

  // Define a global header with shared header options.
  private httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  /**
   * @argument http to perform http requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * @summary fetch all employees
   */
  getAll$(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.url, {
        headers: this.httpHeaders,
        responseType: 'json',
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error.. ', err);
          return throwError(err);
        })
      );
  }

  /**
   *
   * @param id primary key
   * @summary fetch employee by id
   */
  getById$(id: number): Observable<Employee> {
    this.url = `${this.url}/${id}`;
    return this.http
      .get<Employee>(this.url, {
        headers: this.httpHeaders,
        responseType: 'json',
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error.. ', err);
          return throwError(err);
        })
      );
  }

  /**
   *
   * @param entity is an Employee
   * @summary save employee to the database.
   */
  post$(entity: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.url, entity, {
        headers: this.httpHeaders,
        responseType: 'json',
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error.. ', err);
          return throwError(err);
        })
      );
  }

  /**
   *
   * @param entity is an Employee
   * @summary update employee to the database.
   */
  put$(entity: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(this.url, entity, {
        headers: this.httpHeaders,
        responseType: 'json',
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error.. ', err);
          return throwError(err);
        })
      );
  }

  /**
   *
   * @param entity is an Employee
   * @summary delete employee to the database.
   */
  delete$(entity: Employee): Observable<Employee> {
    this.url = `${this.url}/deleteEntity`;
    return this.http
      .post<Employee>(this.url, entity, {
        headers: this.httpHeaders,
        responseType: 'json',
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error.. ', err);
          return throwError(err);
        })
      );
  }

  /**
   *
   * @param criteria empolyee specific criteria.
   * @summary returns an array of employees based on specific criteria.
   */
  getByCriteria$(criteria: EmployeeCriteria): Observable<Employee[]> {
    this.url = `${this.url}/GetByCriteria`;

    let httpParams = new HttpParams();

    Object.keys(criteria).forEach((key) => {
      httpParams = httpParams.append(key, criteria[key].toString());
    });

    return this.http.get<Employee[]>(this.url, {
      headers: this.httpHeaders,
      responseType: 'json',
      params: httpParams,
    });
  }

  /**
   * @summary return an array of postions.
   * @todo fetch the data from end-point.
   */
  getPositions$(): Observable<SelectItem[]> {
    const postions: SelectItem[] = [
      { label: 'Select', value: null },
      { label: 'CEO', value: 1 },
      { label: 'Manager', value: 2 },
      { label: 'HR', value: 3 },
      { label: 'Developer', value: 4 },
    ];

    return of(postions);
  }
}
