import { BehaviorSubject } from 'rxjs';

export abstract class DataStorage {
  protected state$ = new BehaviorSubject<any>(null);
  protected getState$() {
    return this.state$.asObservable();
  }
  protected setState$(newState: any) {
    this.state$.next({ ...this.state$.getValue(), ...newState });
  }
}
