import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/products/product.model';
import { ServiceConfig } from 'src/app/config/service-config';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  entity = 'product';
  token: String = '';
  filter: String = '?filter={"include":[{"relation":"category"},{"relation":"brand"},{"relation":"images"}]}';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }

  /**
   * Get al records of a collection
   */
  getAllRecords(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${this.filter}`);
  }

  /**
   * Get record by id
   * @param id id to search
   */
  getRecordById(id: String): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}${this.filter}`);
  }

  /**
   * Add new record to product collection
   * @param record record data
   */
  saveNewRecord(record: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EditRecord(record: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  DeleteRecord(recordId: String): Observable<any> {
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  addToShoppingCart(cartId, productId) {
    return this.http.post<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}`, {
      productId: productId,
      cartId: cartId
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

}
