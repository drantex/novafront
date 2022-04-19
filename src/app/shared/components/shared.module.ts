import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from './confirm/confirm.component';
import { ProgressComponent } from './progress/progress.component';
import { NotDataFoundComponent } from './not-data-found/not-data-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const COMPONENTS = [
  ConfirmComponent,
  ProgressComponent,
  NotDataFoundComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    NgbAlertModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
