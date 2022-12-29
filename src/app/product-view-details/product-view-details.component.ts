import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from '../_model/product.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  product: Product;
  alertBody = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data.product;
  }

  addToCart(productName: string) {
    this.alertBody = productName + ' added to your cart !';
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();

  }
}
