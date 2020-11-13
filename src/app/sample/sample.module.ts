import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SampleFormComponent],
  imports: [
    CommonModule,
    SampleRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SampleModule { }
