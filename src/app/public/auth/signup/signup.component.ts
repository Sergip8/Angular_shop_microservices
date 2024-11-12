import { Component } from '@angular/core';

import { PublicRoutes } from '../../public.routes';
import { Router } from '@angular/router';
import { pageTransition } from '../../../shared/utils/animations';
import { Images } from '../../../../assets/data/images';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { CommonService } from '../../../_core/services/common.service';
import { AppRoutes } from '../../../app.routes';
import { AdminRoutes } from '../../../admin/admin.routes';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegistrationResponse } from '../auth-models';
import { AlertType } from '../../../shared/components/alert/alert.type';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [pageTransition]
})
export class SignupComponent {
  readonly signupbannerImage:string = Images.auth.signup
  isLoading: boolean = false;
  readonly currentYear: number = DatetimeHelper.currentYear;
  readonly publicRoutes = PublicRoutes;
  showErrors = false
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""

  signUpForm: FormGroup

  constructor(
    public commonService: CommonService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [this.passwordValidator(), Validators.required]],
    });
  }

  onFormSubmitHandler = (event: SubmitEvent) => {
    
    event.preventDefault();

    if(this.signUpForm.valid){
        this.register()
    }else{
      this.showErrors = true
    }
  
    // this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.showErrors = false
      //this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
    }, 3000);
  }
  register(){
    this.authService.signUp(<RegistrationResponse>this.signUpForm.value).subscribe({
      next: data => {
          if(data.success){
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
   passwordValidator():  ValidationErrors|  null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contraseña = control.parent?.get('password');
      const confirmar = control.parent?.get('repassword');
  
      if (!contraseña || !confirmar) {
        return null;
      }
  
      return contraseña.value === confirmar.value ? null : { confirmPassword: true };
    };
}

showAlertElement(){
  this.showAlert = true;
  setTimeout(() => {
    this.showAlert = false
  }, 4000);
  
}
}