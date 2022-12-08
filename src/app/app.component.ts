import { Component, OnInit } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import {mergeMap, tap, take, map, switchMap} from 'rxjs/operators';

type Durum=["flat bread", "meat", "sauce", "tomato", "cabbage"];

interface Order{
  ammount:number;
  customerId:number;
}

interface Product{
  product:Durum;
  customerId:number;
}

let customerId=0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'RxJs';

  durums!:Observable<Durum>;
  delivery$!:Observable<Product>

  _order=new Subject<Order>();

  _flatBread=new Subject<"flat bread">();
  _meat=new Subject<"meat">();
  _sauce=new Subject<"sauce">();
  _tomato=new Subject<"tomato">();
  _cabbage=new Subject<"cabbage">();

  static customerId:number;

  ngOnInit(): void {
    this.durums=zip(
      this._flatBread.pipe(tap(console.log)),
      this._meat.pipe(tap(console.log)),
      this._sauce.pipe(tap(console.log)),
      this._tomato.pipe(tap(console.log)),
      this._cabbage.pipe(tap(console.log))
    ).pipe(
      tap((durum)=>console.log("Enjoy!", durum))
    );
    
    // summary:switchMap: forget the previous one and do the next
    // mergeMap: do all the stream at the same time

    this.delivery$= this._order.pipe(
      tap(order=>console.log("New order: ", order)),
      switchMap(
        // take the order and treat it
        ({ammount, customerId})=>this.durums.pipe(
          take(ammount), 
          // transform the data into product
          map(durum=>({product:durum, customerId}))
        )
      ),
      // waiting for product to emit signal
      tap(product=>console.log("Deliverd Product: ", product))
    )
  }

  dispatchOrder(){
    const ammount=Math.floor(Math.random()*3)+1;
    customerId++;
    this._order.next({ammount, customerId})
  }
}
