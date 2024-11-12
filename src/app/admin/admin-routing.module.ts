import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes, ElementRoutes, SettingRoutes } from './admin.routes';
import { AdminPageNotFoundComponent } from './views/admin-page-not-found/admin-page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AdminAlertComponent } from './views/elements/coupons/coupon.component';
import { ButtonsComponent } from './views/elements/buttons/buttons.component';
import { AdminDataTableComponent } from './views/elements/data-table/data-table.component';
import { FormsComponent } from './views/elements/forms/forms.component';

import { AdminTabComponent } from './views/elements/tab/admin-tab.component';
import { EventsComponent } from './views/events/events.component';
import { TestComponent } from './views/events/test/test.component';
import { ProfileComponent } from './views/settings/profile/profile.component';
import { UsersComponent } from './views/settings/users/users.component';
import { ProductComponent } from './views/elements/product/product.component';
import { CategoryComponent } from './views/elements/category/category.component';
import { ProductPropertyComponent } from './views/elements/product-property/product-property.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: AdminRoutes.Dashboard,
    pathMatch: 'full',
  },
  {
    title: 'Dashboard',
    path: AdminRoutes.Dashboard,
    component: DashboardComponent,
  },
  {
    title: 'Events',
    path: AdminRoutes.Events,
    component: EventsComponent,
    children: [
      {
        path: 'testing',
        component: TestComponent,
        outlet: 'test',
      },
    ],
  },
  {
    title: 'Elements',
    path: AdminRoutes.Elements,
    children: [
      {
        title: 'Coupons',
        path: ElementRoutes.Coupons,
        component: AdminAlertComponent,
      },
      {
        title: 'Products',
        path: ElementRoutes.Products,
        component: ProductComponent,
      },
      {
        title: 'Categories',
        path: ElementRoutes.Categories,
        component: CategoryComponent,
      },
      {
        title: 'Properties',
        path: ElementRoutes.Property,
        component: ProductPropertyComponent,
      },
      {
        title: 'Buttons',
        path: ElementRoutes.Buttons,
        component: ButtonsComponent,
      },
      {
        title: 'Data Table',
        path: ElementRoutes.DataTable,
        component: AdminDataTableComponent,
      },
      {
        title: 'Forms',
        path: ElementRoutes.Forms,
        component: FormsComponent,
      },
    ],
  },
  {
    path: AdminRoutes.Settings,
    children: [
      {
        title: 'Settings',
        path: SettingRoutes.Profile,
        component: ProfileComponent,
      },
      {
        title: 'Users',
        path: SettingRoutes.Users,
        component: UsersComponent,
      },
    ],
  },
  { path: '**', component: AdminPageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

