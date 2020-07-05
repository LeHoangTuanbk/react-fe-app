import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
class DatePickerClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  }
  handleChangeEnd = date => {
    this.setState({ 
      endDate: date
    });
  }
  handleSearchActivities = (Activities) => {
    console.log(this.state.startDate)
    console.log(this.state.endDate)
    console.log(Activities)
  }
  
  render() {
    const Activities = this.props.activities;
    return (
      <div>
        <span className="input-group-btn"> 
            <button onClick={this.handleSearchActivities} className="btn btn-info" type="button" style={{ marginRight: '2.2rem' }}>Tìm Activities theo ngày</button>
        </span>
        <div>
        <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChangeStart}
        dateFormat='dd/MM/yyyy'
        isClearable
        placeholderText="Ngày bắt đầu"
        style={{ marginRight: '2.2rem' }}
        openToDate={new Date()}
        />
        </div>
        <div>
        <DatePicker
        selected={this.state.endDate}
        onChange={this.handleChangeEnd}
        dateFormat='dd/MM/yyyy'
        isClearable
        placeholderText="Ngày kết thúc"
        minDate={this.state.startDate}
        />
        </div>
      </div>
      
    );
  }
  
}

export default DatePickerClock;
