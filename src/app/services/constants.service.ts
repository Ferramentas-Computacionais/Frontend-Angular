import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public API_BASE_URL = 'http://127.0.0.1:5000';

  constructor() { }
}
