import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { handleError } from '../../shared/utils/common-utils';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api;
  private httpClient = inject(HttpClient);

  currentUserSignal = signal<User | null>(null);

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/api/v1/auth/login`, req)
      .pipe(
        catchError(handleError)
      );
  }

  logout(): void {
    this.currentUserSignal.set(null);
  }

  findUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/api/v1/users/${userId}`)
      .pipe(
        catchError(handleError)
      );
  }
  
}
