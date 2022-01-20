import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup | any
  submitted = false

  constructor(
    private auth: AuthService,
    private router: Router//для редиректа
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    // console.log(this.form)
    if (this.form.invalid) {
      return
    }

    this.submitted = true //для блокировки кнопки

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      // returnSecureToken: this.form.value.returnSecureToken,
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])//редирект на страницу dashboard
      this.submitted = false
    })

  }
}
