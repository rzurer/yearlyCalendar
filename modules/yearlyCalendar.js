"use strict";
exports.module = function () {
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    getDaysInMonth = function (month, year) {
      if ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
        return 29;
      }
      return daysInMonth[month];
    },
    test = function () {
      var month, year, months, i, j, firstDayDate, firstDay;
      month = 0;
      year = 2013;
      months = 12;
      for (i = 0; i < months; i += 1) {
        firstDayDate = new Date(year, month, 1);
        firstDay = firstDayDate.getDay();
        for (j = 0; j < 42; j += 1) {
          if ((j < firstDay) || (j >= firstDay + getDaysInMonth(month, year))) {
            continue;
          }
          console.log(j - firstDay + 1);
        }
      }
    };
  return {
    printJanuary : test
  };
};