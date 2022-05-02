"use strict";
/**
 * Home work first
 */
const films = [
    {
        name: "Titanic",
        rating: 9
    },
    {
        name: "Die hard 5",
        rating: 5
    },
    {
        name: "Matrix",
        rating: 8
    },
    {
        name: "Some bad film",
        rating: 4
    },
];

function showGoodFilms(arr) {
    let result = arr.filter(item => item.rating >= 8);
    console.log(result);
    return result;
}

function showListOfFilms(arr) {
    let result = arr.map(item => item.name)
    .reduce((sum, current) => `${sum}, ${current}`);
    console.log(result);
    return result;
}

function setFilmsIds(arr) {
    let result = []; 
    arr.forEach((item, index)=> {
        item.id = index;
        result[index] = item;
    });
    return result;
}

function checkFilms(arr) {
    console.log(arr.every(item => item.id != null));
    return (arr.every(item => item.id != null));
}

//showGoodFilms(films);
//showListOfFilms(films);
const transformedArray = setFilmsIds(films);
checkFilms(transformedArray);
//console.log(transformedArray);
