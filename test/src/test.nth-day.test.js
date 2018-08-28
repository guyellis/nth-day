import assert from 'assert';
import moment from 'moment';
import * as nd from '../../src/nth-day';

const { nthDay } = nd;

describe('nth-day', () => {
  it('should get the third friday', () => {
    // 3rd Fridays for 2016
    const thirdFridays2016 = [15, 19, 18, 15, 20, 17, 15, 19, 16, 21, 18, 16];
    assert.equal(thirdFridays2016.length, 12);
    const year = 2016;

    // The second param to the callback that forEach() calls is the
    // index of the array. Because array indexes are 0 based and so
    // are month values for Date objects, the indexes of a 12 element
    // array will be valid month values.
    thirdFridays2016.forEach((day, month) => {
      const expected = moment([year, month, day]);

      // Test with date as an array
      let actual = nthDay(3, 5, [year, month, 1]);
      assert(actual.isSame(expected));

      // Test with date as a string
      actual = nthDay(3, 5, `${month + 1}/1/${year}`);
      assert(actual.isSame(expected));
    });
  });

  it('should get some predetermined days', () => {
    const year = 2015;
    const month = 11;

    // 1st Tuesday Dec 2015: 12/1/2015
    let actual = nthDay(1, 2, [year, month, 15]);
    assert(actual.isSame(moment([year, month, 1])));

    // 5th Thursday Dec 2015: 12/31/2015
    actual = nthDay(5, 4, [year, month, 15]);
    assert(actual.isSame(moment([year, month, 31])));
  });

  it('should allow string days of week', () => {
    const year = 2015;
    const month = 11;

    // 1st Monday Dec 2015: 12/7/2015
    let actual = nthDay(1, 'monday', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 7])));

    // 1st Tuesday Dec 2015: 12/1/2015
    actual = nthDay(1, 'tues', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 1])));

    // 1st Wednesday Dec 2015: 12/2/2015
    actual = nthDay(1, 'wed', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 2])));

    // 5th Thursday Dec 2015: 12/31/2015
    actual = nthDay(5, 'thursday', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 31])));

    // 1st Friday Dec 2015: 12/4/2015
    actual = nthDay(1, 'fri', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 4])));

    // 1st Saturday Dec 2015: 12/5/2015
    actual = nthDay(1, 'sat', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 5])));

    // 1st Sunday Dec 2015: 12/6/2015
    actual = nthDay(1, 'sun', [year, month, 15]);
    assert(actual.isSame(moment([year, month, 6])));

    // Error
    assert.throws(() => { nthDay(5, 'sfgjsldgj', [year, month, 15]); }, Error, 'Do not recognize this day: ');
  });

  it('should get Election Day', () => {
    const electionDays = [
      { year: 2000, day: 7 },
      { year: 2004, day: 2 },
      { year: 2008, day: 4 },
      { year: 2012, day: 6 },
      { year: 2016, day: 8 },
      { year: 2020, day: 3 },
    ];

    electionDays.forEach((election) => {
      // The first Tuesday that's after the first Monday in November
      const monthDate = `11/1/${election.year}`;
      const actual = nthDay(1, 2, monthDate, nthDay(1, 1, monthDate).date());
      assert(actual.isSame(moment([election.year, 10, election.day])));
    });
  });

  it('should get Arbor Day', () => {
    const arborDays = [
      { year: 2013, day: 26 },
      { year: 2014, day: 25 },
      { year: 2015, day: 24 },
      { year: 2016, day: 29 },
      { year: 2017, day: 28 },
    ];
    arborDays.forEach((arborDay) => {
      // The last Friday in April
      const actual = nthDay(-1, 5, `4/1/${arborDay.year}`);
      assert(actual.isSame(moment([arborDay.year, 3, arborDay.day])));
    });
  });

  it('show throw if dayOfWeek is not number or string', () => {
    assert.throws(() => { nthDay(3, {}, [2017, 7, 15]); });
  });

  it('show throw if dayOfWeek is not in the range 0 to 6', () => {
    assert.throws(() => { nthDay(3, -1, [2017, 7, 15]); });
    assert.throws(() => { nthDay(3, 7, [2017, 7, 15]); });
  });

  it('should throw if relevantDate is not a string or object', () => {
    assert.throws(() => { nthDay(3, 1, 99); });
  });

  it('should throw if relevantDate is not a valid date string', () => {
    assert.throws(() => { nthDay(3, 1, 'i am not a valid date string'); });
  });

  it('should use the current date as the relevantDate if that parameter is falsy', () => {
    const thirdMondayCurrentMonth = nthDay(3, 1);
    const currentMonth = new Date();
    assert.equal(thirdMondayCurrentMonth.month(), currentMonth.getMonth());
    assert.equal(thirdMondayCurrentMonth.year(), currentMonth.getFullYear());
  });
});
