import moment from 'moment';

function dateFromDate(date) {
  if(!date) {
    return moment();
  }

  if(typeof date === 'string') {
    let dateObj = new Date(date);
    if(dateObj.toString() === 'Invalid Date') {
      console.log('Invalid Date:', date);
      throw date;
    }
    return moment(dateObj);
  }

  if(typeof date === 'object') {
    if(moment.isMoment(date)) {
      return date;
    } else {
      return moment(date);
    }
  }

  throw new Error('Do not know how to handle this type:', typeof date);
}

// nth - value from 1 through 5 for the (say) 4th Friday
// dayOfWeek - 0 through 6 (Sun through Sat)
// relevantDate - a date as a string or Date object or moment object
// Returns a moment date
export function nthDay(nth, dayOfWeek, relevantDate) {
  relevantDate = dateFromDate(relevantDate);
  const month = relevantDate.month();
  const year = relevantDate.year();

  let counter = nth - 1;
  let day = counter * 7 + 1;

  const date = moment([year, month, day]);
  date.subtract(1, 'day');
  while(counter !== nth) {
    date.add(1, 'day');
    if(date.day() === dayOfWeek) {
      counter++;
    }
  }
  return date;
}
