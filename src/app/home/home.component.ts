import {Component, OnInit} from '@angular/core';
import {ProductService} from '../_services/product.service';
import {map} from 'rxjs/operators';
import {Product} from '../_model/product.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ImageProcessingService} from '../_services/image-processing.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber = 0;
  productDetails = [];
  showMoreBtn = false;


  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // tslint:disable-next-line:typedef
  public getAllProducts(searchKey: string = '') {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.creatImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          if (resp.length === 4) {
            this.showMoreBtn = true;
          } else {
            this.showMoreBtn = false;
          }
          resp.forEach(p => this.productDetails.push(p));
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  // tslint:disable-next-line:typedef
  showProductDetails(productId) {
    this.router.navigate(['/productViewDetails', {productId}]);
  }

  // tslint:disable-next-line:typedef
  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  // tslint:disable-next-line:typedef
  searchByKeyword(searchKey) {
    console.log(searchKey);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKey);
  }

}
