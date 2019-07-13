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
  momentUpdatedMonth,
  firstAvailableCalendarDate,
  lastAvailableCalendarDate,
  onToggleCalendar,
}) => {

  // keep track of booked dates
  const bookedCalendarMonth = [...calendarMonth];

  let calendarDayClassName = null;
  let calendarDate = null;
  const lastDay = momentUpdatedMonth.daysInMonth();

  // format calendar date to moment obj
  const momentCalendarDate = moment(`${momentUpdatedMonth.year()}-${momentUpdatedMonth.month() + 1}-${calendarDay}`, 'YYYY-MM-DD');
  calendarDate = momentCalendarDate.format('YYYY-MM-DD');

  // if calendar day does not exist, calendar day classname should be empty
  if (calendarDay < 1 || calendarDay > lastDay) {
    calendarDayClassName = `${styles.CalendarDay} ${styles.Empty}`;

  } else if (momentCalendarDate.isAfter(lastAvailableCalendarDate)

  // check booked dates which are before today, after last available date, or in booked dates obj
    || momentCalendarDate.isBefore(firstAvailableCalendarDate)
    || bookedDatesObj[calendarDate]) {

    calendarDayClassName = `${styles.CalendarDay} ${styles.Booked}`;

    // mark booked dates with x
    bookedCalendarMonth[calendarRow][calendarCol] = 'x';

  // if calendar day matches checkin day
  } else if (calendarDate === checkinDate) {

    // make calendar day background green
    calendarDayClassName = `${styles.CalendarDay} ${styles.Checkin}`;

  // if checkout date exists
  } else if (checkoutDate) {
    if (momentCalendarDate.isSameOrBefore(moment(checkoutDate, 'YYYY-MM-DD'))) {
      calendarDayClassName = `${styles.CalendarDay} ${styles.Checkin}`;
    } else {
      calendarDayClassName = `${styles.CalendarDay} ${styles.Available}`;
    }
  } else if (checkinDate && momentCalendarDate.isSameOrBefore(moment(hoveredDate, 'YYYY-MM-DD'))) {
    // console.log('hovered', hoveredDate);
    calendarDayClassName = `${styles.CalendarDay} ${styles.AvailableForCheckout}`;
  } else {
    calendarDayClassName = `${styles.CalendarDay} ${styles.Available}`;
  }

  return (
    <td>
      <input
        className={styles.CalendarDay}
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
        onClick={() => {
          if (checkinDate) {
            // console.log('checkout');
            onCheckout(calendarDate);
            onToggleCalendar();
          } else {
            onCheckin(calendarDate);
          }
        }}
        value={calendarDay}
      />
    </td>
  );
};

export default CalendarDay;
