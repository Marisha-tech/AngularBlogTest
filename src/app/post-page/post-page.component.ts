import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  //TypeScript включает строгую проверку классов, где все свойства должны быть инициализированы в конструкторе. Обходной путь — добавить !постфикс к имени переменной
  post$!: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.post$ = this.route.params
      //изменить направление стримов от params до нужного стрима
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      }))
  }

}
