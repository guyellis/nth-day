# nth-day

Find the nth day of the month.

e.g. 3rd Tuesday or 2nd Wednesday

## Install

`npm i nth-day --save`

## Usage

```
var nd = require('nth-day');

// Param #1: nth, 1 to 5, 1st, 2nd, 3rd etc. (Number)
// Param #2: day, 0 = Sun, 1 = Mon, ... 6 = Sat (can also use string, i.e. 'monday' or 'mon')
// Param #3: date: A string or Date object to find the month and year, day is not used

var date = nd.nthDay(3, 5, '12/1/2015');

// Finds the 3rd (3), Friday (5), in December 2015
// date is now 12/16/2015, a moment object
```
