import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditePageComponent} from './edite-page/edite-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'create', component: CreatePageComponent},
          {path: 'post/:id/edit', component: EditePageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],

})

export class AdminModule {

}
