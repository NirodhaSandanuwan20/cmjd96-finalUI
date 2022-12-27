import {Component, OnInit} from '@angular/core';
import {ProductService} from '../_services/product.service';
import {Product} from '../_model/product.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ShowProductImagesDialogComponent} from '../show-product-images-dialog/show-product-images-dialog.component';
import {ImageProcessingService} from '../_services/image-processing.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  showTable = false;
  showMoreButton = false;
  pageNumber = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price', 'Images', 'Edit', 'Delete'];

  constructor(private productService: ProductService,
              public imagesDialog: MatDialog,
              public imageProcessingService: ImageProcessingService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // tslint:disable-next-line:typedef
  public getAllProducts() {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.creatImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          resp.forEach(product => {
            this.productDetails.push(product);
          });
          this.showTable = true;
          if (resp.length === 4) {
            this.showMoreButton = true;
          } else {
            this.showMoreButton = false;
          }
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  // tslint:disable-next-line:typedef
  deleteProduct(productId) {
    if (confirm('Are You Sure Delete this Product ?')) {
      this.productService.deleteProduct(productId).subscribe(
        (resp) => {
          console.log(resp);
          this.getAllProducts();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      return;
    }

  }

  // tslint:disable-next-line:typedef
  showImages(product: Product) {
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
    console.log(product);
  }

  // tslint:disable-next-line:typedef
  editProductDetails(productId) {
    this.router.navigate(['/addNewProduct', {productId}]);
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
}
