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

function dayFromString(dayOfWeek) {
  if (typeof dayOfWeek === 'string'){
    var dow = dayOfWeek.toLowerCase();

    console.log(dow)

    if (dow === 'monday' || dow === 'mon') return 1;
    if (dow === 'tuesday' || dow === 'tues') return 2;
    if (dow === 'wednesday' || dow === 'wed') return 3;
    if (dow === 'thursday' || dow === 'thurs') return 4;
    if (dow === 'friday' || dow === 'fri') return 5;
    if (dow === 'saturday' || dow === 'sat') return 6;
    if (dow === 'sunday' || dow === 'sun') return 0;

    throw new Error('Do not recognize this day: ', dayOfWeek);
  } else {
    return dayOfWeek;
  }
}

// nth - value from 1 through 5 for the (say) 4th Friday
// dayOfWeek - 0 through 6 (Sun through Sat)
// relevantDate - a date as a string or Date object or moment object
// Returns a moment date
export function nthDay(nth, dayOfWeek, relevantDate) {
  relevantDate = dateFromDate(relevantDate);
  const month = relevantDate.month();
  const year = relevantDate.year();

  var dow = dayFromString(dayOfWeek);

  let counter = nth - 1;
  let day = counter * 7 + 1;

  const date = moment([year, month, day]);
  date.subtract(1, 'day');
  while(counter !== nth) {
    date.add(1, 'day');
    if(date.day() === dow) {
      counter++;
    }
  }
  return date;
}
