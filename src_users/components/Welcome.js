import React,{ Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import "../stylesheets/welcome.css";

import UsersDatePicker from './UsersDatePicker';
import UsersSelect from './UsersSelect';
import WeekDetails from './WeekDetails';

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
    let weekDetailsComp="";
    let weeksItems=[];
    const { users:{users},weeks:{weeks} }=this.props;

    console.log("props..",weeks)
   
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
            ( this.state.showWeekDetails ) ? ( <WeekDetails weeks={ weeks } /> )
            : <div></div>
          }
          
          <div className="fields-section buttons-section">
            <Button bsStyle="success">Accept</Button>
            <Button bsStyle="danger">Reject</Button>
          </div>
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