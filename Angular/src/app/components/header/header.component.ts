import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  status: boolean = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  clickEvent(){
      this.status = !this.status;
  }

  logout(){
    localStorage.removeItem('info');
    this.route.navigate(['login']);
  }

}
