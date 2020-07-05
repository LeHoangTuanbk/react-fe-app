import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

export default class DateRangePicker extends Component {
  render() {
    const { startDate, endDate, handlePickDate, onResetDateRange } = this.props
    return (
      <div>
        <DatePicker
          selected={startDate}
          onChange={date => handlePickDate(date, null)}
          dateFormat='dd/MM/yyyy'
          isClearable
          placeholderText="Ngày bắt đầu"
          style={{ marginRight: '2.2rem' }}
          openToDate={new Date()}
        />
        <DatePicker
          selected={endDate}
          onChange={date => handlePickDate(null, date)}
          dateFormat='dd/MM/yyyy'
          isClearable
          placeholderText="Ngày kết thúc"
          minDate={startDate}
        />
        <span className="input-group-btn"> 
            <button onClick={onResetDateRange} className="btn btn-info" type="button" style={{ marginRight: '2.2rem' }}>Reset</button>
        </span>
      </div>

    );
  }

}
