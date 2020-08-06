import { ProductModel } from './product.model';

export class ProductImageModel {
    id?: String;
    path: String;
    order: number;
    product?: ProductModel;
    productId: String;
}