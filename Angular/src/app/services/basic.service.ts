import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor() {}

}

export function isNullOrUndefined(data: any) {
  return data === null || data === undefined;
}

export function isNull(data: any) {
  return data === null;
}

export function isUndefined(data: any) {
  return data === undefined;
}
