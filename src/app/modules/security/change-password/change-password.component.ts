import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../../../models/security/change-password.model';
import MD5 from 'crypto-js/md5';

declare const showMessage: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  fgValidator: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    });
  }

  /**
   * Method to validate credentials of a user
   */
  ChangePasswordFn() {
    if (this.fgValidator.invalid || this.fgv.newPassword.value != this.fgv.newPassword2.value) {
      showMessage("Invalid form.");
    } else {
      //showMessage("Registering...");
      let model = this.getPasswordData();
      this.service.ChangePassword(model).subscribe(
        data => {
          showMessage("Your password has been changed successfuly.");
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
  getPasswordData(): ChangePasswordModel {
    let model = new ChangePasswordModel();
    model.id = this.service.getUserId();
    model.currentPassword = MD5(this.fgv.currentPassword.value).toString();
    model.newPassword = MD5(this.fgv.newPassword.value).toString();
    model.newPassword2 = MD5(this.fgv.newPassword2.value).toString();
    return model;
  }


  get fgv() {
    return this.fgValidator.controls;
  }

}
