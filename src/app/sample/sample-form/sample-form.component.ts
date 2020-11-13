import { EmployeeService } from './../services/employee.service';
import { Employee } from './../models/employee';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
})
export class SampleFormComponent implements OnInit, OnDestroy {
  employeeForm: FormGroup;
  employee: Employee;
  subscription: Subscription = new Subscription();
  positions$: Observable<SelectItem[]>;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

 

  ngOnInit(): void {
    this.positions$ = this.employeeService.getPositions$();
    this.initForm();
    this.bindEvents();
  }

  /**
   * @summary listen for form events. 
   */
  bindEvents() {
    const postion$ = this.employeeForm.get('position').valueChanges;
    // listen for changes in postin value.
    postion$.subscribe(value => {
      // perform an action.
      console.log(value);
    })
    
  }

  /**
   * @summary initiate the form.
   */
  initForm() {
    this.employeeForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      phone: [null],
      workPhone: [null],
      position: [null],
    });
  }

  /**
   * @summary save or update an employee
   */
  onSubmit() {
    if (this.employeeForm.valid) {
      this.employee && this.employee.id
        ? this.updateEmployee()
        : this.saveEmployee();
    }
  }

  /**
   * @summary update employee.
   */
  updateEmployee() {
    this.employee = this.employeeForm.value;
    this.subscription.add(
      this.employeeService.put$(this.employee).subscribe((result) => {
        this.employee = result;
      })
    );
  }

  
  /**
   * @summary save employee.
   */
  saveEmployee() {
    this.employee = this.employeeForm.value;
    console.log(this.employee);
    this.subscription.add(
      this.employeeService.post$(this.employee).subscribe((result) => {
        this.employee = result;
      })
    );
  }

  /**
   * @summary unsubscribe for all subsctriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
