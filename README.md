# nth-day

[![Greenkeeper badge](https://badges.greenkeeper.io/guyellis/nth-day.svg)](https://greenkeeper.io/)

Find the nth day of the month.

e.g. 3rd Tuesday or 2nd Wednesday

## Install

`npm install nth-day -S`

or

`yarn add nth-day`

## Usage

```js
var nd = require('nth-day');
```

### Syntax

```js
var momentDate = nd.nthDay(
  <day-ordinal>,
  <day-of-week>,
  <date-stringOrObject-of-month>,
  <start-day>
);
```

### Parameters

1. nth, 1 to 5, 1st, 2nd, 3rd etc. (Number)
2. day, 0 = Sun, 1 = Mon, ... 6 = Sat (can also use string, i.e. 'monday' or 'mon')
3. date: A string or Date object to find the month and year, day is not used
4. (optional): The day of the month to start counting from.
   It defaults to zero (i.e. counting from the beginning of the month.)

### Examples

Problem: Find the 3rd Friday in December 2015

```js
// Finds the 3rd (3), Friday (5), in December 2015
// returns 12/16/2015, a moment object
var thirdFridayDecember2015 = nd.nthDay(3, 5, '12/1/2015');
```

Problem: Find the 2nd Tuesday after the 1st Friday in December 2015

```js
var secondTueAfterFirstFridayDecember2015 =
  nd.nthDay(2, 2, '12/1/2015', nd.nthDay(1, 5, '12/1/2015'));
```

Problem: Find the last Sunday in January 2015

```js
// Negative indices count backwards from the end of the month
var lastSundayInJanuary2015 = nd.nthDay(-1, 0, '1/1/2015')
```
