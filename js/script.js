"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: () => {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms: () => {
        for (let i = 0; i < 2; i++) {
            const c = prompt('Один из последних просмотренных фильмов?', ''),
                d = prompt('На сколько оцените его?', '');
    
            if (c != null && d != null && c != '' && d != '' && c.length < 50 && d.length < 50) {
                personalMovieDB.movies[c] = d;
            } else {
                i--;
            }
        }
    },
    detectPersonalLevel: () => {
        if (personalMovieDB.count < 10) {
            console.log('Просмотрено мало фильмов');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log('Вы классический зритель');
        } else if (personalMovieDB.count >= 30) {
            console.log('Вы киноман');
        } else {
            console.log('Произошла ошибка');
        }
    },
    showMyDB: (hidden) => {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },
    writeYourGenres: () => {
        
        for (let i = 1; i < 4; i++) {
            let genreName = prompt(`Ваш любимый жанр под номером ${i}`, '');
            if (genreName === '' || genreName == null) {
                i--;
            } else {
                personalMovieDB.genres[i - 1] = genreName;
                
            }
        }
        personalMovieDB.genres.forEach(element => {
            console.log(`Любимый жанр #${personalMovieDB.genres.indexOf(element) + 1} - это ${element}`);
        });
    },
    toggleVisibleMyDB: () => {
        if (personalMovieDB.privat) {
            personalMovieDB.privat = false;
        } else {
            personalMovieDB.privat = true;
        }
    }
};


// personalMovieDB.start();
// personalMovieDB.rememberMyFilms();
// personalMovieDB.detectPersonalLevel();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.toggleVisibleMyDB();