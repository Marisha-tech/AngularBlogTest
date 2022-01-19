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
