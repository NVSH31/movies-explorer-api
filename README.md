# movies-explorer-api
Backend дипломной работы курса Веб-разработчик

## домен API
api.shpaknv.diplom.nomoredomains.rocks

## адрес репозитория
https://github.com/NVSH31/movies-explorer-api

## эндпоинты

### POST /signup
создаёт пользователя с переданными в теле
email, password и name

### POST /signin
проверяет переданные в теле почту и пароль
и возвращает JWT

### GET /users/me
возвращает информацию о пользователе (email и имя)

### PATCH /users/me
бновляет информацию о пользователе (email и имя)

### GET /movies
возвращает все сохранённые текущим  пользователем фильмы

### POST /movies
создаёт фильм с переданными в теле
country, director, duration, year, description, image,
trailerLink, nameRU, nameEN, thumbnail, movieId

### DELETE /movies/_id
удаляет сохранённый фильм по id
