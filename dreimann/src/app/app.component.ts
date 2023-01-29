import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dreimann';
  
  const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
  
    constructor(private http:HttpClient) { 
    //this.useHost = environment.host;//"localhost";//"87.187.44.125";
   /* console.log("onini");
    this.getIp().subscribe((result:any) => {
      console.log("sub fertig");
      if (environment.host === result.ip) {
        this.useHost = "localhost";
        console.log("usehost localhost");
      }
    });*/
  }
  
  onClickq() {
	  console.log("ll")
	    const url = `https://google.com`;
    var body = "{}";//JSON.stringify();
    return this.http.post<void>(url, body, httpOptions).subscribe(
        res => {
          console.log(res)
    });
  }
}
