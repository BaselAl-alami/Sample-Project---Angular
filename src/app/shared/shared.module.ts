import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

/**
 * @summary import & export all shared modules from third party libraries.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, InputTextModule, PanelModule,ButtonModule, DropdownModule],
  exports: [InputTextModule, PanelModule, DropdownModule, ButtonModule],
})
export class SharedModule {}
