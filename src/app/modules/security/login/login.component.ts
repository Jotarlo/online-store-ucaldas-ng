import { Component, OnInit } from '@angular/core';
import { FormsConfig } from 'src/app/config/forms-config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/security/user.model';
import { SecurityService } from '../../../services/security.service';
import MD5 from 'crypto-js/md5';

declare const showMessage: any;
declare const initSidenav: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgValidator: FormGroup;
  usernameMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLength)]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Method to validate credentials of a user
   */
  LoginCustomerFn() {
    if (this.fgValidator.invalid) {
      showMessage("Invalid form.");
    } else {
      //showMessage("Registering...");
      let model = this.getLoginData();
      console.log(model);
      this.service.CustomerLogin(model).subscribe(
        data => {
          console.log(data);
          this.service.saveSessionData(data);
          //showMessage("Welcome to your account.");
          this.router.navigate(['/home']);
        },
        error => {
          showMessage("Invalid data.");
        }
      );
    }
  }

  /**
   * Get user data in a model
   */
  getLoginData(): UserModel {
    let model = new UserModel();
    model.username = this.fgv.username.value;
    model.password = MD5(this.fgv.password.value).toString();
    return model;
  }


  get fgv() {
    return this.fgValidator.controls;
  }

}
