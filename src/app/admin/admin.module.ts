import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AdminComponent } from './admin.component';
import { AdminPageNotFoundComponent } from './views/admin-page-not-found/admin-page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EventsComponent } from './views/events/events.component';
import { SettingsModule } from './views/settings/settings.module';
import { ElementsModule } from './views/elements/elements.module';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptor } from '../_core/interceptors/requests.interceptor';
import { httpInterceptorProviders } from '../_core/interceptors/interceptors.provider';
import { errorInterceptor } from '../_core/interceptors/errors.interceptor';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminPageNotFoundComponent,
    EventsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,
    SettingsModule,
    ElementsModule
  ],
  providers: [
   // httpInterceptorProviders
    provideHttpClient(withInterceptors([interceptor, errorInterceptor])),
  ]
 
})
export class AdminModule { }
