import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    permissionLevel: 1
  };

  constructor(private api: ApiService, private basic: BasicService) { }

  ngOnInit(): void {
  }

  createAccount(): void{
    this.api.getResponse('users', 'POST', this.user).then(() => {
      this.clean();
      alert('Registro Exitoso');
    });
  }

  clean(): void {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      permissionLevel: 1
    };
  }

}
