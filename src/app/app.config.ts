import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './_core/interceptors/interceptors.provider';
import { interceptor } from './_core/interceptors/requests.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([interceptor])), provideAnimations()]
};
