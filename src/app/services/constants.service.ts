import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public API_BASE_URL = 'http://185.228.72.137:5000';

  constructor() { }
}
