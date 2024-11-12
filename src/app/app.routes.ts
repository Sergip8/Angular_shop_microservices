import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { hasRoleGuard } from './_core/guard/has-role';
import { Role } from './public/auth/auth-models';
import { AdminPageNotFoundComponent } from './admin/views/admin-page-not-found/admin-page-not-found.component';
import { UnauthorizedComponent } from './admin/views/admin-page-not-found/admin-page-unauthorized.component';

export enum AppRoutes{
    Admin = "admin",
}

export const routes: Routes = [
    {
      path: '',
      component: PublicComponent,
      loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
    },
    {
      path: AppRoutes.Admin,
      component: AdminComponent,
      // canActivate : [hasRoleGuard],
      // data:{
      //   roles: [Role.ADMIN]
      // },
      loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    },
    {
      path: 'forbidden',
      component: AdminPageNotFoundComponent
    },
    {
      path: 'unauthorized',
      component: UnauthorizedComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent
    },
  ];
  
//   @NgModule({
//     imports: [RouterModule.forRoot(routes, {
//         // enableTracing: true, //uncomment for debugging only
//       preloadingStrategy: PreloadAllModules,
//       scrollPositionRestoration: 'top',
//     })],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule { }
