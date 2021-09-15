import { Injectable } from '@angular/core';

import { Product } from 'src/models/product';
import { catchError, map ,tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  // đường dẫn đến nơi chứa dữ liệu của sản phẩm
  productURL = "http://localhost:3000/product";
  cartURL = "http://localhost:3000/cart";

  constructor(private http: HttpClient) { }

  //Get(shop): phương thức lấy dữ liệu của shop-main trên server thông qua get của httpclient
  getProduct(): Observable<Product[]>{
    //dữ liệu nhân về sẽ chui vào pipe
    return this.http.get<Product[]>(this.productURL).pipe(
      //nếu nhận được dữ liệu sẽ vào tap và hiện thị ra console
      tap(receiveShop => console.log(`receiveShop = ${JSON.stringify(receiveShop)}`)),
      //nếu xảy ra lỗi trả về mảng rỗng
      catchError(error => of([]))
    )
  }

  //Get(cart): phương thức lấy dữ liệu của cart trên server thông qua get của httpclient
  getProductCart(): Observable<Product[]>{
    //dữ liệu nhân về sẽ chui vào pipe
    return this.http.get<Product[]>(this.cartURL).pipe(
      //nếu nhận được dữ liệu sẽ vào tap và hiện thị ra console
      tap(receiveCart => console.log(`receiveShop = ${JSON.stringify(receiveCart)}`)),
      //nếu xảy ra lỗi trả về mảng rỗng
      catchError(error => of([]))
    )
  }

  //Post(cart): thêm dữ liệu vào cart
  addProduct(product:Product):Observable<Product> {
    return this.http.post<Product>(this.cartURL,product,httpOptions).pipe(
      tap(product => console.log(`product add = ${JSON.stringify(product)}`)),
      catchError(error=>of(new Product))
    )
  }

  //Delete(cart): xóa dữ liệu khỏi cart theo id
  deleteCart(id:number):Observable<Product>{
    return this.http.delete<Product>(`${this.cartURL}/${id}`,httpOptions).pipe(
      tap(deleteP => console.log(`delete product = ${JSON.stringify(deleteP)}`)),
      catchError(error => of(new Product))
    )
  }
}
