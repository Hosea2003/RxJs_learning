import { Component, OnInit } from '@angular/core';
import { asapScheduler, interval, Observable, observeOn, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RxJs';

  progress$!:Observable<number>;

  ngOnInit(): void {
    this.progress$=interval(1000/60).pipe(take(100));
  }

  runAsync(){
    // assapScheduler, asyncScheduler
    setTimeout(()=>console.log("setTimeout call back"), 0);
    Promise.resolve("Promise value").then(console.log);
    of("Stream value").pipe(
      observeOn(asapScheduler)
    ).subscribe(console.log);
  }
}
