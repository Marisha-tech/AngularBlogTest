import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class AuthService {

  public error$: Subject<string> = new Subject<string>() //публичная переменная стрим для показа ошибки пользователю

  constructor(private http: HttpClient) {
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp')!)
    if (new Date() > expDate) {
      this.logout()
      return ''
    }
    return localStorage.getItem('fb-token')!
  }

  //авторизация
  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))//обработка ошибок
      )
  }

  //выход
  logout() {
    this.setToken(null)
  }

  //приватный метод для обработки ошибок
  private handleError(error: HttpErrorResponse):any {
    const {message} = error.error.error //получение сообщения ошибки
    console.log(message)
    switch(message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break
    }
    return throwError(error)
  }

  isAuthentificated(): boolean {
    return !!this.token
  }

  //логика изменение токена
  public setToken(response: FbAuthResponse | null) {
    // console.log(response)
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }
  }
}
