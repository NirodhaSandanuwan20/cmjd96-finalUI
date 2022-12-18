import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Product} from '../_model/product.model';
import {Observable, of} from 'rxjs';
import {ProductService} from './product.service';
import {map} from 'rxjs/operators';
import {ImageProcessingService} from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService) {
  }

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get('productId');

    if (id) {
      return this.productService.getProductDetailsById(id).pipe(
        map(p =>
          this.imageProcessingService.creatImages(p))
      );
    } else {
// @ts-ignore
      return of(this.getProductDetails());
    }
  }

  // tslint:disable-next-line:typedef
  getProductDetails() {
    // tslint:disable-next-line:no-shadowed-variable

    return {
      productId: null,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    };
  }
}
