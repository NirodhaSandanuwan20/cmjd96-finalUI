import { Injectable } from '@angular/core';
import {Product} from '../_model/product.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  public addProduct(product: FormData){
    // @ts-ignore
    return this.httpClient.post<Product>('http://localhost:9090/addNewProduct', product);
  }

  // tslint:disable-next-line:typedef
  public getAllProducts(pageNumber, searchKeyWord: string = ''){
    return this.httpClient.get<Product[]>('http://localhost:9090/getAllProducts?pageNumber=' + pageNumber + '&searchKey=' + searchKeyWord);
  }

  // tslint:disable-next-line:typedef
  public deleteProduct(productId: number){
    return this.httpClient.delete('http://localhost:9090/deleteProductDetails/' + productId);
  }

  // tslint:disable-next-line:typedef
  public getProductDetailsById(productId){
    return this.httpClient.get<Product>('http://localhost:9090/getProductDetailsById/' + productId);
  }
}
