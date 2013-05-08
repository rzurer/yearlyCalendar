"use strict";
exports.module = function () {
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    getDaysInMonth = function (month, year) {
      if ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
        return 29;
      }
      return daysInMonth[month];
    };
  return {};
};

