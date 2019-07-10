/* eslint-disable padded-blocks */
import React from 'react';
import moment from 'moment';
import styles from '../../styles/calendar.module.css';

const CalendarDay = ({
  calendarRow,
  calendarCol,
  calendarMonth,
  calendarDay,
  onCheckin,
  onCheckout,
  onHover,
  checkinDate,
  checkoutDate,
  hoveredDate,
  bookedDatesObj,
  momentAddedMonth,
  firstAvailableCalendarDate,
  lastAvailableCalendarDate,
}) => {

  // keep track of booked dates
  const bookedCalendarMonth = [...calendarMonth];

  // if calendar day does not exist, calendar day classname should be empty
  let calendarDayClassName = 'CalendarDay Empty';

  let calendarDate = null;

  // if calendar day exists
  if (calendarDay) {
    // format calendar date to moment obj
    const momentCalendarDate = moment(`${momentAddedMonth.year()}-${momentAddedMonth.month() + 1}-${calendarDay}`, 'YYYY-MM-DD');
    calendarDate = momentCalendarDate.format('YYYY-MM-DD');

    // check booked dates which are before today, after last available date, or in booked dates obj
    if (momentCalendarDate.isAfter(lastAvailableCalendarDate)
      || momentCalendarDate.isBefore(firstAvailableCalendarDate)
      || bookedDatesObj[calendarDate]) {

      calendarDayClassName = 'CalendarDay Booked';

      // mark booked dates with x
      bookedCalendarMonth[calendarRow][calendarCol] = 'x';

    // if calendar day matches checkin day
    } else if (calendarDate === checkinDate || checkoutDate) {

      // make calendar day background green
      calendarDayClassName = 'CalendarDay Checkin';

    } else if (checkinDate && momentCalendarDate.isSameOrBefore(moment(hoveredDate, 'YYYY-MM-DD'))) {
      // console.log('hovered', hoveredDate);
      calendarDayClassName = 'CalendarDay AvailableForCheckout';
    } else {
      calendarDayClassName = 'CalendarDay Available';
    }
  }

  return (
    <td>
      <input
        className={calendarDayClassName}
        type="button"
        onMouseEnter={() => {
          if (checkinDate && !checkoutDate) {
            if (calendarDayClassName === 'CalendarDay Available' || calendarDayClassName === 'CalendarDay AvailableForCheckout') {
              onHover(calendarDate);
            }
          }
        }}
        onMouseLeave={() => {
          if (hoveredDate && !checkoutDate) {
            onHover(null);
          }
        }}
        onClick={checkinDate ? e => onCheckout(calendarDate) : e => onCheckin(calendarDate)}
        value={calendarDay}
      />
    </td>
  );
};

export default CalendarDay;