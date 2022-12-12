import { Component, OnInit } from '@angular/core';
import { map, Observable, of, shareReplay, timestamp } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RxJs';

  posts!:Observable<any[]>

  constructor(private http:HttpClient){
    // broadcasting the value to all subscriber (hot observable)
    this.posts=this.http.get<any[]>("https://jsonplaceholder.typicode.com/posts").pipe(shareReplay())
  }

  ngOnInit(): void {
    const obs=fromtimestamp();

    obs.subscribe(console.log)

    setTimeout(()=>{
      obs.subscribe(console.log)
    }, 2000)
  }
}

const fromtimestamp=():Observable<number>=>{
  //multicasting, same datasource shared for all subscriber
  // const timestamp=Date.now()
  return new Observable((subscriber)=>{
    // unicast, each subscriber has its own datasource
    const timestamp=Date.now()
    subscriber.next(timestamp);
  })
}
