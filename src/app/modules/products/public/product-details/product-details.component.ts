import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductImageModel } from 'src/app/models/products/product-image.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: String;
  productDetails: ProductModel;
  images: ProductImageModel[];

  constructor(private route: ActivatedRoute,
    private service: ProductService,
    private secService: SecurityService) {
    this.productId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getDataOfProduct();
  }

  getDataOfProduct() {
    this.service.getRecordById(this.productId).subscribe(
      data => {
        this.productDetails = data;
        this.images = this.productDetails.images;
      },
      err => {

      }
    );
  }

  AddToShoppingCart() {
    let cartId = this.secService.getCartId();
    this.service.addToShoppingCart(cartId, this.productId).subscribe(
      data => {
        alert("OK")
      },
      err => {

      }
    );
  }

}
