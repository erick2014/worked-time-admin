import React,{ Component } from "react";
import { connect } from "react-redux";
import { FormControl } from "react-bootstrap";
import "../stylesheets/welcome.css";

import UsersDatePicker from './UsersDatePicker';
import UsersSelect from './UsersSelect';

/*date picker stuff*/
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { fetchUsersRequest,fetchWeeksRequest } from '../actions';

// App component
class Welcome extends Component {
  constructor(props){
    super(props);
    this.state={
      startDate:moment(),
      selectedMonth:"",
      showWeekDetails:true
    }
    this.onClickDatePicker=this.onClickDatePicker.bind(this);
    this.onChangeSelectOption=this.onChangeSelectOption.bind(this);
    this.getWeekDetails=this.getWeekDetails.bind(this);
  }
  componentWillMount(){
    //fetch users 
    //this.props.dispatch( fetchUsersRequest() );
    //fetch weeks for the current date
    // this.props.dispatch( fetchWeeksByMonth() )
    this.getWeekDetails();
  }

  getWeekDetails(){
    let currentDate=this.state.startDate.format("l");
    let month=currentDate.split("/");
    month=month[0]
    this.props.dispatch( fetchWeeksRequest(month) )
  }

  onClickDatePicker(date) {
    let currentDate=date.format("l")
    let month=currentDate.split("/");
    month=month[0]
    this.setState({startDate: date,selectedMonth:month});
  }

  onChangeSelectOption(){
    
  }

  render() {
    const UsersDropdown="";
    const { users:{users} }=this.props;

    let weekDetailsComp=
      <div>
        <div>For Month {this.state.selectedMonth} We found the following weeks:</div>
        <div>
          <div>Week <span>19</span></div>
          <div>Days in week:<span> 8,9,10,11,12,13,14</span></div>
        </div>
      </div>

    return (
      <div className="container">

          <div className="fields-section">
            <span>Select user: </span>
            <div className="field-box">
              <UsersSelect users={users} onChangeSelectOption={ this.onChangeSelectOption }/>
            </div>
          </div>

          <div className="fields-section">
            <span>Pick a date: </span>
            <div className="field-box">
              <UsersDatePicker date={this.state.startDate} onClickDatePicker={this.onClickDatePicker}/>
            </div>
          </div>

          {
            ( this.state.showWeekDetails ) ?
            (
              weekDetailsComp
            )
            : <div></div>
          }
          

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    weeks: state.weeks,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Welcome);