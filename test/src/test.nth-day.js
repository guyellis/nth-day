import * as nd from '../../src/nth-day';
import assert from 'assert';
import moment from 'moment';

const {nthDay} = nd;

describe('nth-day', () => {

  it('should get the third friday', () => {

    // 3rd Fridays for 2016
    let thirdFridays2016 = [15, 19, 18, 15, 20, 17, 15, 19, 16, 21, 18, 16];
    assert.equal(thirdFridays2016.length, 12);
    const year = 2016;

    // The second param to the callback that forEach() calls is the
    // index of the array. Because array indexes are 0 based and so
    // are month values for Date objects, the indexes of a 12 element
    // array will be valid month values.
    thirdFridays2016.forEach((day, month) => {
      let expected = moment([year, month, day]);

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
    assert.throws(function(){nthDay(5, 'sfgjsldgj', [year, month, 15])}, Error, "Do not recognize this day: ");
  });


});
