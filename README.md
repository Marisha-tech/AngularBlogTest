# AngularBlogTest

Тестовый блог на Angular
Публичная часть: https://angularblogtest-1b8f2.web.app/
Админка: https://angularblogtest-1b8f2.web.app/admin
admin@mail.ru
123456

### Languages and Tools
![Angular](https://img.shields.io/badge/-Angular-090909?style=for-the-badge&logo=Angular)
![HTML](https://img.shields.io/badge/-HTML5-090909?style=for-the-badge&logo=HTML5)
![CSS](https://img.shields.io/badge/-CSS-090909?style=for-the-badge&logo=CSS3)
![JavaScript](https://img.shields.io/badge/-JS-090909?style=for-the-badge&logo=JavaScript)

### Themes
<ol>
<li>Что такое Angular</li>
<li>Установка</li>
<li>Создание компонентов</li>
<li>Генерация компонентов</li>
<li>Добавление PWA</li>
<li>Как протестировать что сборка работает?</li>
<li>Деплой приложения</li>
</ol>


## 1. Что такое Angular
Angular - js библиотека, которая в ядре использует RXJS и TypeScript, служит для разработки сложных сайтов

Документация: https://angular.io/docs

## 2. Установка

<ol>
<li>Нужен node JS</li>
<li>Установка Angular <code>npm install -g @angular/cli</code></li>
<li>Для генерации нового проекта нужно зайти в папку проекта  <code>ng new ng-basics</code>
<ol>
<li>Хотим ли добавить роутинг для проекта?</li>
<li>Какой стиль использовать? Выбираю scss</li>
<li>Происходит генерация проекта. В корне создается файл package.json, в котором прописаны все зависимости</li>
</ol>
</li>
<li>Запуск приложения <code>npm start</code></li>
</ol>

## 3. Создание компонентов
<ol>
<li>Создать в папке app папку. В ней создать файл .ts</li>
</ol>

## 4. Генерация компонентов

<code>ng g c form --skipTests</code>

--skipTests - не генерировать тесты <br>
form - название компонента<br>
c - сгенерировать компонент<br>
g - сгенерировать

Метод bindings - служит для связки шаблона и компонента
<p>Для байндинга атрибут нужно обернуть в квадратные скобки</p>

Ивент байндинг - принимает пользовательские действия и дает команду самому компоненту

## 5. Добавление PWA
<ol>
<li>Остановить выполнение проекта (ctrl+C)</li>
<li>Запустить установку ng add @angular/pwa, подтвердить выполнение
<p>Появятся файлы (manifest.webmanifest, ngsw-config.json)</p>
<p>В src\app\app.module.ts появляется ServiceWorkerModule, который регистрируется в imports</p>
</li>
<li>Отредактировать ngsw-config.json:
<p>Закэшировать шрифты:</p>
<p>
<code> "files": [<br>
                "/favicon.ico",<br>
                "/index.html",<br>
                "/manifest.webmanifest",<br>
                "/*.css",<br>
                "/*.js"<br>
              ],<br>
              "urls": [<br>
                "https://fonts.googleapis.com/css?family=Roboto"<br>
              ]</code>
</p>
<p>На уровне "assetGroups" создать "dataGroups":</p>
<code>
  "dataGroups": [<br>
    {<br>
      "name": "firebase-posts",<br>
      "urls": [<br>
        "https://angularblogtest-1b8f2-default-rtdb.firebaseio.com/**"<br>
      ],<br>
      "cacheConfig": {<br>
        "maxSize": 5,<br>
        "maxAge": "3600"<br>
      }<br>
    }<br>
  ]
</code>
</li>
<li>Сделать production сборку<br>
<code>ng build --prod</code>
</li>
<li>После чего в корне создалась папка dist </li>
</ol>

### 6. Как протестировать что сборка работает?
<ol>
<li>Установить http-server<br>
<code>npm install -g http-server</code>
</li>
<li>
<p>Перейти в папку dist <code>cd dist/</code>.</p>
<p>Перейти в папку AngularBlogTest <code>cd AngularBlogTest/</code></p>
<p>В папке проекта запустить проект <code>http-server -p 4200</code></p>
</li>
<li>В консоли перейти по доступному адресу (например  http://127.0.0.1:4200).
<p>В строке браузера добавить /index.html</p>
</li>
<li>В консоли Application -> Service Worker видим зарегистрированный Service Worker (Source ngsw-worker.js)</li>
<li>В Cache Storage можно увидеть закэшированные посты, значит Service Worker работает и приложение запускается быстрее, т.к. данные берутся из кэша</li>
</ol>

## 7. Деплой приложения
<ol>
<li>Зайти в firebase -> hoisting -> начать</li>
<li>Установить firebase-tools<br>
<code>npm install -g firebase-tools</code>
</li>
<li>После установки пакета возвращаемся в firebase, нажимаем далее</li>
<li><code>firebase login</code></li>
<li>Если не было аккаунта, то откроется вкладка браузера, где можно выбрать аккаунт</li>
<li><code>firebase init</code><br>
<p>Обязательно нужно находиться в корневой папке (<code>cd..</code> - выйти из папки)</p>
</li>
<li>Выбрать Hoisting (выбрать пробелом -> enter)</li>
<li>Какой проект используем?
<p> Use an existing project
</p></li>
<li>Выбрать проект</li>
<li>Какая директория является публичной? dist/AngularBlogTest</li>
<li>Необходимо ли конфигурировать данное приложение как single page application? - Y</li>
<li>Настроить автоматические сборки и развертывания с помощью GitHub? - </li>
<li>File dist/AngularBlogTest/index.html already exists. Overwrite? - n</li>
<li><code>firebase deploy</code></li>
</ol>
