import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edite-page',
  templateUrl: './edite-page.component.html',
  styleUrls: ['./edite-page.component.scss']
})
export class EditePageComponent implements OnInit, OnDestroy {

  form: FormGroup | any
  post: Post | any //для хранения id поста
  submitted = false //флаг для обновления формы

  uSub: Subscription | any

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    //отписываться от route не нужно, тк ангуляр делает это самостоятельно
    // this.route.params.subscribe((params: Params) => {
      //вместо subscribe можно использовать метод switchMap
      // this.route.params.subscribe((params: Params) => {})
      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id'])
        })).subscribe((post: Post) => {
          this.post = post //для хранения id поста
          this.form = new FormGroup({
            title: new FormControl(post.title, Validators.required),
            text: new FormControl(post.text, Validators.required),
          })
      })

      //выполнить запрос к БД, чтобы получить отдельный пост
      //получили params[id]
      //после того, как получили params[id] его нужно передать в новый стрим
  }

  ngOnDestroy() {
    if (this.uSub){
      this.uSub.unsubscribe()
    }
  }

  submit() {
    //если форма не валидна, то не отправлять форму
    if (this.form.invalid) {
      return
    }

    this.submitted = true
    //обновление поста
    this.uSub = this.postService.update({
      ...this.post,//для хранения инфы поста
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false
      this.alert.warning('Пост обновлен')
    })
  }
}
