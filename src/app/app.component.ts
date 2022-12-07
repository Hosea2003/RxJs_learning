import { Component, OnInit } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import {tap} from 'rxjs/operators';

type Durum=["flat bread", "meat", "sauce", "tomato", "cabbage"];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'RxJs';

  durums!:Observable<Durum>;
  _flatBread=new Subject<"flat bread">();
  _meat=new Subject<"meat">();
  _sauce=new Subject<"sauce">();
  _tomato=new Subject<"tomato">();
  _cabbage=new Subject<"cabbage">();

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
  }
}
