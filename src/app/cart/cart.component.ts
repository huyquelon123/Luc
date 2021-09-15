import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ShopServiceService } from '../shop-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product!:Product[];
  total = 0

  constructor(private service: ShopServiceService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  // Get: lấy dữ liệu trên server thông qua service
  getProduct(){
    this.service.getProductCart().subscribe(p => {
      this.product = p;
      for(let i =0 ; i < p.length;i++){
        this.total += p[i].price
      }
    });
  }

  //Delete: xóa dữ liệu dựa trên id tryền vào
  deleteProduct(id:number){
    //hàm subcribe quan sát khi nào có kết quả chui vào hàm để xử lý
    this.service.deleteCart(id).subscribe(
      //hàm filter sẽ lọc ra những cái bản ghi phù hợp với điều kiện bên phía tay phải
      _ => this.product = this.product.filter(eachP => eachP.id !== id)
    )
  }
}
