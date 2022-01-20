import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthService {
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
        tap(this.setToken)
      )
  }

  //выход
  logout() {
    this.setToken(null)
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
