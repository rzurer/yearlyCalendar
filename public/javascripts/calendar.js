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
    dayInYear = 1;
    for (i = 0; i < months; i += 1) {
      firstDayDate = new Date(year, month, 1);
      firstDay = firstDayDate.getDay();
      console.log(firstDay);
      for (j = 0; j < 42; j += 1) {
        if ((j < firstDay) || (j >= firstDay + getDaysInMonth(month, year))) {
          continue;
        }
        console.log(monthNames[i] + ' ' + (j - firstDay + 1) + ' ' + dayInYear);
        dayInYear += 1;
      }
      month += 1;
    }
  };
function renderCalendar(parent, year) {
    var i, j, k, m, index, month, monthTable, monthTables, yearTable, row, cell, firstDayDate, firstDay, dayOfWeek, businessDaysInYear, dayInYear; 
    month = 0;
    businessDaysInYear = 0,
    dayInYear = 1;
    monthTables = [];
    for (i = 0; i < 12; i += 1) {
      monthTable = $('<table>');
      monthTable.attr('id', 'calendarMonth'+ i);
      row = $('<tr>');
      cell = $('<th>'); 
      cell.text(monthNames[month]);
      cell.css('font-size', '11px');
      cell.css('color', 'black');
      cell.attr('colspan', 7);
      row.append(cell);
      monthTable.append(row);
      row = $('<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>');
      row.css('color', 'blue')
      row.css('vertical-align', 'top');
      row.css('font-weight', 'normal')
      row.css('line-height', '20px')
      monthTable.append(row);
      firstDayDate = new Date(year, month, 1);
      firstDay = firstDayDate.getDay();
      for (j = 0; j < 42; j += 1) {
        if (j % 7 === 0){
          row = $('<tr>'); 
          monthTable.append(row);    
        }
        if ((j < firstDay) || (j >= firstDay + getDaysInMonth(month, year))) {
          cell =$('<td>'); 
          cell.text('');
          row.append(cell);
        } else {
          cell =$('<td>'); 
          cell.css('border', '1px solid gainsboro');
          cell.css('vertical-align', 'top');
          cell.css('width', '28px');
          cell.css('height', '28px');
          cell.text(j - firstDay + 1);
          cell.attr('id', year + '|' + dayInYear);
          dayInYear += 1;
          dayOfWeek = new Date(year, month, j - firstDay).getDay();
          if(dayOfWeek === 6 || dayOfWeek === 5){
             cell.css('color', 'gainsboro');    
          } else {
            businessDaysInYear += 1;
          }
          row.append(cell);        
        }
      }
      month += 1;
      monthTables.push(monthTable);
   }
    index = 0;
    yearTable = $('<table>');
    row = $('<tr>');
    cell = $('<th>'); 
    cell.text(year);
    cell.css('font-size', '16px');
    cell.attr('colspan', 3);
    row.append(cell);
    cell = $('<th>'); 
    cell.text('Business Days: ' + businessDaysInYear);
    cell.css('font-size', '12px');
    cell.css('text-align', 'right');
    row.append(cell);
    yearTable.append(row);
    for (k = 0; k < 3; k += 1) {
      row = $('<tr>'); 
      row.css('vertical-align', 'top');
      for (m = 0; m < 4; m += 1) {
         cell =$('<td>');
         cell.css('border', '1px solid gainsboro');
         cell.css('padding', '2px');
         cell.html(monthTables[index]);
         row.append(cell);
         index += 1;
      }
      yearTable.append(row);
    }
   parent.append(yearTable);
}