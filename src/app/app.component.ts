import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  starWarsArray = [];
  originalStarWarsArray = [];
  nextApiUrl = '';
  previousApiUrl = '';
  filterText = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('https://swapi.dev/api/people').subscribe(this.call);
  }

  call = (response: any) => {
    this.nextApiUrl = response?.next;
    this.previousApiUrl = response?.previous;
    console.log(response);
    this.starWarsArray = response?.results;
    this.originalStarWarsArray = response?.results;
  };

  callNext = () => {
    this.http.get(this.nextApiUrl).subscribe(this.call);
  };

  callPrevious = () => {
    this.http.get(this.previousApiUrl).subscribe(this.call);
  };

  filterMethod = () => {
    this.starWarsArray = this.originalStarWarsArray.filter((value) => {
      return value.name.includes(this.filterText);
    });
  };
}
