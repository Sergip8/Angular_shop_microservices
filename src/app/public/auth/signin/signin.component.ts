import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertType } from '../../../shared/components/alert/alert.type';
import { PublicRoutes } from '../../public.routes';
import { pageTransition } from '../../../shared/utils/animations';
import { Images } from '../../../../assets/data/images';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { CommonService } from '../../../_core/services/common.service';
import { AuthService } from '../auth.service';
import { LoginRequest, LoginResponse } from '../auth-models';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [pageTransition],
})
export class SigninComponent {
  readonly signinBannerImage: string = Images.bannerLogo;

  isLoading: boolean = false;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;

  serverErrors: string[] = [];
  showErrors = false
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""

  @Output() loginSuccess = new EventEmitter<void>()


  signInForm: FormGroup

  constructor(
    public commonService: CommonService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required],
    });
  }
  protected readonly AlertType = AlertType;

  protected onFormSubmitHandler = (event: SubmitEvent) => {
    if(this.signInForm.valid){
      this.login()
  }else{
    this.showErrors = true
  }
    // event.preventDefault();
    // this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.showErrors = false
      //this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
    }, 3000);
  };

  protected onAlertCloseHandler = (e: any) => {
    this.serverErrors = [];
  };
  login(){
    
    this.authService.signIn(<LoginResponse>this.signInForm.value).subscribe({
      next: data => {
        console.log(data)
          if(data.success){
            this.authService.updateUser(<LoginRequest>data.data)
            this.alert = AlertType.Success
            
            
          }else{
            this.alert = AlertType.Danger
          }
          this.alertMsg = data.message

      },error: e => {
        this.alert = AlertType.Danger
        this.alertMsg = e.message
      },complete: ()=> this.showAlertElement()
    })
  }
  showAlertElement(){
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
      if(this.alert === AlertType.Success){
        this.loginSuccess.emit()
      }
    }, 2000);
    
  }
}
