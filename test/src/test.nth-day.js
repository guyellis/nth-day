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

});
