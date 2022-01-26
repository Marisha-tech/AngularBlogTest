# AngularBlogTest

Тестовый блог на Angular

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
</ol>


## 1. Что такое Angular
Angular - js библиотека, которая в ядре использует RXJS и TypeScript, служит для разработки сложных сайтов

https://angular.io/docs - документация

## 2. Установка

<ol>
<li>Нужен node JS</li>
<li>npm install -g @angular/cli - установка Angular</li>
<li>ng new ng-basics - для генерации нового проекта нужно зайти в папку проекта  
<ol>
<li>Хотим ли добавить роутинг для проекта?</li>
<li>Какой стиль использовать? Выбираю scss</li>
<li>Происходит генерация проекта. В корне создается файл package.json, в котором прописаны все зависимости</li>
</ol>
</li>
<li>npm start - запуск приложения</li>
</ol>

## 3. Создание компонентов
<ol>
<li>Создать в папке app папку. В ней создать файл .ts</li>
</ol>

## 4. Генерация компонентов
ng g c form --skipTests

--skipTests - не генерировать тесты
form - название компонента
c - сгенерировать компонент
g - сгенерировать

Метод bindings - служит для связки шаблона и компонента
Для байндинга атрибут нужно обернуть в квадратные скобки

Ивент байндинг - принимает пользовательские действия и дает команду самому компоненту

## Добавление PWA
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

### Как протестировать что сборка работает?
<ol>
<li>Установить http-server<br>
<code>npm install -g http-server</code>
</li>
<li>Перейти в папку dist <code>cd dist/</code>. Перейти в папку AngularBlogTest <code>cd AngularBlogTest/</code> В папке проекта запустить проект
<code>http-server -p 4200</code>
</li>
<li>В консоли перейти по доступному адресу (например  http://127.0.0.1:4200). В строке браузера добавить /index.html</li>
<li>В консоли Application -> Service Worker видим зарегистрированный Service Worker (Source ngsw-worker.js)</li>
<li>В Cache Storage можно увидеть закэшированные посты, значит Service Worker работает и приложение запускается быстрее, т.к. данные берутся из кэша</li>
<li></li>
</ol>

##Деплой приложения
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
