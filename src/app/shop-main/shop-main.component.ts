import { Component, OnInit } from '@angular/core';

import { Product } from 'src/models/product';
import { ShopServiceService } from '../shop-service.service';

@Component({
  selector: 'app-shop-main',
  templateUrl: './shop-main.component.html',
  styleUrls: ['./shop-main.component.css']
})
export class ShopMainComponent implements OnInit {

  product!: Product[];
  constructor(private service: ShopServiceService) { }

  ngOnInit(): void {
    this.getProductFromService();
  }

  //hàm lấy dữ liệu trên server thông qua service.ts
  getProductFromService() {
    this.service.getProduct().subscribe(p => this.product = p);
  }

  //hàm thêm dữ liệu vào database cart khi click vào nút button Mua ngay sử dụng phương
  //thức post ở bên shop-service
  addProductToCart(name: string,source:string,price: number,sex:string) {
    const product :Product = new Product();
    product.name = name;
    product.source = source;
    product.price = price;
    product.sex = sex;
    this.service.addProduct(product).subscribe();
    alert('Đã thêm vào giỏ hàng')
  }
}
