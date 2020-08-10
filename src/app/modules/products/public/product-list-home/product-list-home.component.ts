import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.css']
})
export class ProductListHomeComponent implements OnInit {

  productList: ProductModel[];

  constructor(private service: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getAllRecords().subscribe(
      data => { 
        this.productList = data;
      },
      err => { }
    );
  }


  OpenDetails(id){
    this.router.navigate([`/products/product-details/${id}`]);
  }

}
