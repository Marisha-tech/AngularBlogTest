import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edite-page',
  templateUrl: './edite-page.component.html',
  styleUrls: ['./edite-page.component.scss']
})
export class EditePageComponent implements OnInit {

  form: FormGroup | any
  post: Post | any //для хранения id поста
  submitted = false //флаг для обновления формы

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
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
          this.post = post
          this.form = new FormGroup({
            title: new FormControl(post.title, Validators.required),
            text: new FormControl(post.text, Validators.required),
          })
      })

      //выполнить запрос к БД, чтобы получить отдельный пост
      //получили params[id]
      //после того, как получили params[id] его нужно передать в новый стрим
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false
    })
  }
}
