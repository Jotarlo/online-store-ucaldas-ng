import { Injectable } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceConfig } from '../config/service-config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  entity = 'customer';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Method to call customer POST in backend
   * @param customer customer data to save
   */
  CustomerRegistering(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(`${ServiceConfig.BASE_URL}${this.entity}`, customer, {
      headers: new HttpHeaders({})
    });
  }

}
