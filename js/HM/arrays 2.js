"use strict";

/**
 * также работа с методами массива
 */

const funds = [
    {amount: 1400},
    {amount: 2400},
    {amount: 1000},
    {amount: 500},
    {amount: 10400},
    {amount: 11400}
];

const getGood = (data) => {
    return data.map(item => item.amount)
        .filter(item => item > 0)
        .reduce((sum, current) => sum + current);
};

const getTotal = (data) => {
    return data.some(item => item.amount < 0) 
    ? data.map(item => item.amount).reduce((sum, current) => sum + current) 
    : getGood(data);
};
// console.log(getGood(funds));
console.log(getTotal(funds));