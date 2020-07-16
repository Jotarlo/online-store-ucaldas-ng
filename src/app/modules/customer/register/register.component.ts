import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { CustomerService } from '../../../services/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerModule } from '../customer.module';
import { Router } from '@angular/router';

declare const showMessage: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fgValidator: FormGroup;
  documentMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;
  nameMinLength = FormsConfig.NAME_MIN_LENGTH;

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  CustomerRegisterFn() {
    if (this.fgValidator.invalid) {
      showMessage("Invalid form.");
    } else {
      //showMessage("Registering...");
      let model = this.getCustomerData();
      this.service.CustomerRegistering(model).subscribe(
        data => {
          showMessage("Register succesfully, you can find your password in your email inbox.");
          this.router.navigate(['/security/login']);
        },
        error => {
          showMessage("Error registering.");
        }
      );
    }
  }

  getCustomerData(): CustomerModel {
    let model = new CustomerModel();
    model.address = this.fgv.address.value;
    model.city = this.fgv.city.value;
    model.document = this.fgv.document.value;
    model.email = this.fgv.email.value;
    model.lastname = this.fgv.lastname.value;
    model.name = this.fgv.name.value;
    model.phone = this.fgv.phone.value;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }

}
