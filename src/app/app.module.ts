import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageComponent } from './page/page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NotificationAnimationType, SimpleNotificationsModule } from 'angular2-notifications';
import { SharedModule } from './shared/components/shared.module';
import { ModalPersonComponent } from './page/modal/modal-person/modal-person.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ModalPersonComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SimpleNotificationsModule.forRoot({
      timeOut: 7000,
      showProgressBar: true,
      pauseOnHover: true,
      position: ['top', 'right'],
      theClass: 'sy-notification',
      animate: NotificationAnimationType.Fade
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
