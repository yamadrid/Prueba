import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from './basic.service';

export interface Info {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PATH = environment.URL;

  constructor(
    private http: HttpClient,
  ) { }

  async getToken() {
    const data: any = localStorage.getItem('info');

    if (!isNullOrUndefined(data)) {
      const token: Info = JSON.parse(data);
      if (!isNullOrUndefined(token.accessToken)) {
        const c = token.accessToken as string;
        return c;
      }
      return '';
    } else {
      return '';
    }

  }

  getHeader() {
    return new Promise((resolve, reject) => {
      this.getToken().then((res) => {
        const data: any = {};
        if (res !== '') {
          data['Authorization'] = `Bearer ${res}`;
        }
        const head = new HttpHeaders(data);

        resolve(head);


      });
    });
  }

  getRequest(method: string, route: string, options: any, time = 1) {
    return new Promise((resolve, reject) => {
      this.http.request(method, route, options).subscribe(
        (res: any) => {
          resolve({
            data: res,
            status: {
              number: 200,
              text: 'Ok',
            },
          });
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

    getResponse(ruta: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', datas: any) {
      return new Promise((resolve, reject) => {
        this.getHeader().then(head => {
          const options: any = {
            headers: head,
            body: datas,
          };

          this.getRequest(method, this.PATH + ruta, options).then(
            (data: any) => {
              if (data.status.number === 200) {
                resolve(data.data);
              } else {
                reject(data.error1);
              }
            }
          );

        });
        });
  }
}
