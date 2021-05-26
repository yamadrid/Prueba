import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BasicService } from 'src/app/services/basic.service';
import { Info } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data = {
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private basic: BasicService, private route: Router) { }

  ngOnInit(): void {
  }

  login(): void{
    this.api.getResponse('auth', 'POST', this.data).then((ev: any) => {
      const token = {
        accessToken: ev.accessToken
      };
      localStorage.setItem('info', JSON.stringify(token));
      this.route.navigate(['/home']);
    }, () => {
      alert('Datos incorrectos');
    });
  }

}
