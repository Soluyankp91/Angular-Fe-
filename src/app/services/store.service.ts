import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public setI(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log(err.message);
    }
  }
  public getI(key: string): string | null {
    try {
      return JSON.parse(localStorage.getItem(key) as string).jwt_token;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }
  public removeI(key: string): void {
    localStorage.removeItem(key);
  }
}
