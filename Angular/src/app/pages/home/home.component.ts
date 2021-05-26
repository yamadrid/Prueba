import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries: Country[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.api.getResponse('countries', 'GET', {}).then((ev: any) => {
      this.countries = ev;
    });
  }

}
