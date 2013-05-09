/*global  $*/
"use strict";
var productSpecificationsCalendar = function (urlLibrarian) {
    var yearsArray,
      currentYearIndex,
      daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      getDaysInMonth = function (month, year) {
        if ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
          return 29;
        }
        return daysInMonth[month];
      },
      createMonthTableHeaderRow = function (monthName) {
        var row, cell;
        row = $('<tr>');
        cell = $('<th>');
        cell.addClass('monthTableHeader');
        cell.text(monthName);
        cell.attr('colspan', 7);
        row.append(cell);
        return row;
      },
      createDaysOfWeekHeaderRow = function () {
        var row;
        row = $('<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>');
        row.addClass('daysOfWeekHeader');
        return row;
      },
      createCalendarDayCell = function (id, text, isWeekendDay, data) {
        var cell;
        cell = $('<td>');
        cell.attr('id', id);
        cell.text(text);
        cell.addClass("calendarCell");
        if (isWeekendDay) {
          cell.addClass("weekendCell");
        }
        return cell;
      },
      createProductCell = function (product) {
        var cell, span;
        cell = $('<th>');
        cell.text('Product: ');
        span = $('<span>');
        span.text(product);
        cell.append(span);
        cell.addClass("productCell");
        return cell;
      },
      createPreviousYearImage = function (clickMethod) {
        var image;
        image = $('<img>');
        image.attr('src', urlLibrarian.PreviousImage);
        image.click(clickMethod);
        return image;
      },
      createNextYearImage = function (clickMethod) {
        var image;
        image = $('<img>');
        image.attr('src', urlLibrarian.NextImage);
        image.click(clickMethod);
        return image;
      },
      showYearTable = function () {
        $('#' + yearsArray[currentYearIndex]).show();
      },
      createYearCell = function (year) {
        var cell, previousYear, nextYear, span;
        cell = $('<th>');
        previousYear = function () {
          if (currentYearIndex > 0) {
            currentYearIndex -= 1;
          }
          $('.yearTable').hide();
          showYearTable();
        };
        nextYear = function () {
          if (currentYearIndex < yearsArray.length - 2) {
            currentYearIndex += 1;
          }
          $('.yearTable').hide();
          showYearTable();
        };
        cell.append(createPreviousYearImage(previousYear));
        span = $('<span>');
        span.text(year);
        cell.append(span);
        cell.append(createNextYearImage(nextYear));
        cell.addClass("yearCell");
        cell.attr('colspan', 2);
        return cell;
      },
      createYearInfoCell = function (businessDaysInYear) {
        var cell;
        cell = $('<th>');
        cell.text('Business Days: ' + businessDaysInYear);
        cell.addClass("yearInfoCell");
        return cell;
      },
      createYearHeaderRow = function (product, year, businessDaysInYear) {
        var row;
        row = $('<tr>');
        row.addClass('yearHeaderRow');
        row.append(createProductCell(product));
        row.append(createYearCell(year));
        row.append(createYearInfoCell(businessDaysInYear));
        return row;
      },
      createMonthContainerRow = function () {
        var row;
        row = $('<tr>');
        row.addClass('monthContainerRow');
        return row;
      },
      createMonthContainerCell = function (monthTable) {
        var cell;
        cell = $('<td>');
        cell.addClass('monthContainerCell');
        cell.html(monthTable);
        return cell;
      },
      createCalendarFor = function (year) {
        var i, j, row, monthTables, month, firstDay, monthTable, dayInYear, businessDaysInYear, dayOfWeek, isWeekendDay;
        monthTables = [];
        businessDaysInYear = 0;
        dayInYear = 0;
        month = 0;
        for (i = 0; i < 12; i += 1) {
          firstDay = new Date(year, month, 1).getDay();
          monthTable = $('<table>');
          monthTable.append(createMonthTableHeaderRow(monthNames[month]));
          monthTable.append(createDaysOfWeekHeaderRow());
          for (j = 0; j < 42; j += 1) {
            if (j % 7 === 0) {
              row = $('<tr>');
              monthTable.append(row);
            }
            if (j < firstDay || j >= firstDay + getDaysInMonth(month, year)) {
              row.append($('<td>'));
            } else {
              dayInYear += 1;
              dayOfWeek = new Date(year, month, j - firstDay).getDay();
              isWeekendDay = dayOfWeek === 6 || dayOfWeek === 5;
              if (!isWeekendDay) {
                businessDaysInYear += 1;
              }
              row.append(createCalendarDayCell(year + '|' + dayInYear, j - firstDay + 1, isWeekendDay));
            }
          }
          month += 1;
          monthTables.push(monthTable);
        }
        return { businessDaysInYear: businessDaysInYear, monthTables: monthTables };
      },
      createYearTableForProductYear = function (product, year) {
        var k, m, calendar, index, yearTable, row;
        calendar = createCalendarFor(year);
        index = 0;
        yearTable = $('<table>');
        yearTable.attr('id', year);
        yearTable.addClass('yearTable');
        yearTable.append(createYearHeaderRow(product, year, calendar.businessDaysInYear));
        for (k = 0; k < 3; k += 1) {
          row = createMonthContainerRow();
          for (m = 0; m < 4; m += 1) {
            row.append(createMonthContainerCell(calendar.monthTables[index]));
            index += 1;
          }
          yearTable.append(row);
        }
        return yearTable;
      },
      getObjectInfo = function (obj) {
        var prop, that = [];
        if (!obj) {
          return that;
        }
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            that.push({name : prop, value : obj[prop]});
          }
        }
        return that;
      },
      addData = function (table, data) {
        if (!data) {
          return;
        }
        var array = getObjectInfo(data);
        array.forEach(function (element) {
          console.log(element.name);
          console.log(element.value);
        });
      };
    return {
      renderCalendar: function (parent, product, years, data) {
        var yearTable,
          currentYear = new Date().getFullYear();
        yearsArray = years;
        currentYearIndex = yearsArray.indexOf(currentYear);
        years.forEach(function (year) {
          yearTable = createYearTableForProductYear(product, year);
          addData(yearTable, data);
          parent.append(yearTable);
        });
        if (currentYearIndex < 0) {
          currentYearIndex = 0;
        }
        showYearTable();
      }
    };
  };