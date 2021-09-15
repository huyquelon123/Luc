import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/product';
import { ShopServiceService } from '../shop-service.service'

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {
  @ViewChild('paypalRef',{static:true}) private paypalRef!: ElementRef;
  transportFee = 40;
  total = 0;
  totalUSD = '';
  cart!: Product[];

  constructor(private service: ShopServiceService) { }

  ngOnInit(): void {
    this.getDataFromCard();
    this.insertButton();
  }

  //lấy dữ liệu từ card thông qua service + tính tổng tiền và chuyển sang usd
  getDataFromCard(){
    this.service.getProductCart().subscribe(p => {
      this.cart = p;
      for(let i =0 ; i < p.length;i++){
        this.total += p[i].price*1000;
      }
      if(p.length>0){
        this.total += 40000;
      }
      this.totalUSD = (this.total/22760.5).toFixed(2);
    })
  }

  //xóa hết dữ liệu trong card
  deleteAll() {
    for(let i = 0; i<this.cart.length; i++){
      this.service.deleteCart(this.cart[i].id).subscribe(p => {
        this.cart = this.cart.filter(data => data.id !== p.id)
        window.location.reload();
      })
    };    
  }

  //sự kiện submit form
  onSubmit(data:any) {
    this.deleteAll();
    alert('Thanh toán thành công'); 
    console.log(data);
  }


  //button paypal
  insertButton() {
    window.paypal.Buttons({
      style:{
        layout: "horizontal"
      },
      //sự kiện xảy ra khi người dùng click vào button
      createOrder: (data:any,actions:any) => {
        return actions.order.create({
          purchase_units:[{
            amount:{
              value: this.totalUSD,
              currency_code: 'USD'
            }
          }]
        })
      },
      //xảy ra khi đã thực hiện xong thanh toán
      onApprove: (data:any,actions:any) => {
        return actions.order.capture().then((_: any) => {
          this.deleteAll();        
        })
      },

      onError: (error:any) => {
        console.log(error)
      }
    }).render(this.paypalRef.nativeElement)
  }

}
