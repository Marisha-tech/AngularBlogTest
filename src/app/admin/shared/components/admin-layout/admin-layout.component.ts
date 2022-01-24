import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AuthService,//публичный, чтобы можно было работать в шаблоне, т.к. после сборки проекта на продакшн могут возникнуть ошибки
  ) {
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault()//отменить дефолтное поведение ссылки
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
