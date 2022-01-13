"use strict";

let numberOfFilms;

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
        
    }
    personalMovieDB.count = numberOfFilms;
}

function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        const c = prompt('Один из последних просмотренных фильмов?', ''),
            d = prompt('На сколько оцените его?', '');
    
        if (c != null && d != null && c != '' && d != '' && c.length < 50 && d.length < 50) {
            personalMovieDB.movies[c] = d;
        } else {
            i--;
        }
    }
}

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log('Просмотрено мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log('Вы классический зритель');
    } else if (personalMovieDB.count >= 30) {
        console.log('Вы киноман');
    } else {
        console.log('Произошла ошибка');
    }
}

function showMyDB(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    }
}

function writeYourGenres() {
    let genreName;
    for (let i = 1; i < 4; i++) {
        if (genreName == '' || genreName == null) {
            genreName = prompt(`Ваш любимый жанр под номером ${i}`,'');
            personalMovieDB.genres[i - 1] = genreName;
            genreName = '';
        }
    }
}

start();
rememberMyFilms();
detectPersonalLevel();
writeYourGenres();
showMyDB(personalMovieDB.privat);
