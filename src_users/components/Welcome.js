import React,{ Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import "../stylesheets/welcome.css";

/*Custom components*/
import UsersDatePicker from './UsersDatePicker';
import UsersSelect from './UsersSelect';
import WeekDetails from './WeekDetails';
import MyModal from './MyModal';

/*date picker stuff*/
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


import { fetchUsersRequest,fetchWeeksRequest,approveWeekRequest } from '../actions';

// App component
class Welcome extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:"",
      startDate:"",
      selectedMonth:"",
      showWeekDetails:false,
      modalTitle:"",
      modalBody:"",
      showModal:false,
      weekSelectedId:"",
      weekSelectedNumber:""
    }
    this.onClickDatePicker=this.onClickDatePicker.bind(this);
    this.onChangeSelectOption=this.onChangeSelectOption.bind(this);

    /*Approve and reject handlers*/
    this.getWeekDetails=this.getWeekDetails.bind(this);
    this.getWeekToAprove=this.getWeekToAprove.bind(this);
    this.onClickApproveOrDenyBtn=this.onClickApproveOrDenyBtn.bind(this);

    /*Modal handlers*/
    this.onClickCloseBtnModal=this.onClickCloseBtnModal.bind(this);
    this.onClickAcceptBtnModal=this.onClickAcceptBtnModal.bind(this);
    this.showUpmodalWithInfo=this.showUpmodalWithInfo.bind(this);

  }
  componentWillMount(){
    //fetch users 
    this.props.dispatch( fetchUsersRequest() );
  }

  getWeekDetails(monthNumber){
    //dispatch an action to get all weeks using the selected user and month
    this.props.dispatch( fetchWeeksRequest( monthNumber,this.state.userId ) )
  }

  onClickDatePicker(date) {
    let currentDate=date.format("l")
    let dateList=currentDate.split("/");
    this.setState({ startDate: date,selectedMonth:dateList[0],selectedDay:dateList[1] });
    this.getWeekDetails( dateList[0] );
  }

  onChangeSelectOption(userObj){
    let userId=userObj.target.value;
    this.setState({userId: userId });
  }

  /*Approve or deny button handler*/
  onClickApproveOrDenyBtn( clickedBtn ){
    this.getWeekToAprove( clickedBtn );
  }

  /*Get the week to approve or reject*/
  getWeekToAprove( clickedBtn ){
    let selectedDayNum=parseInt(this.state.selectedDay);
    const {weeks}=this.props;
    let weekId=null;
    let weekNumber=null;

    //look for the corresponding week id using the choosen day in calendar
    for( var i=0;i<weeks.length;i++ ){
       let week=weeks[i];
       if( week.days_in_week.indexOf( selectedDayNum )!==-1 ){
         weekId= week["week_id"];
         weekNumber= week["week_number"];
        break;
       }
    }

    if( weekId ) {
      this.showUpmodalWithInfo( clickedBtn,weekId,weekNumber );
    }
      
  }

  /*Close option handler for modal*/ 
  onClickCloseBtnModal(){
    this.setState({ showModal:false });
  }

  /*Accept option handler for modal*/
  onClickAcceptBtnModal(){
    //dispatch the action to approve or deny a week
    console.log("approving with week id ",this.state.weekSelectedId)
    this.props.dispatch( approveWeekRequest( this.state.weekSelectedId, 3, 'approved' ) );
  }

  /*Open the modal and validate the clicked option*/ 
  showUpmodalWithInfo( clickedBtnText,weekId,weekNumber ){
    this.setState({ 
      weekSelectedId:weekId,
      weekSelectedNumber:weekNumber,
      modalBody:`Are you sure you want to ${clickedBtnText} week #${weekNumber} ?`,
      showModal:true
    });
  }

  render() {
    const UsersDropdown="";
    let weekDetailsComp="";
    let weeksItems=[];
    const { users:{users},weeks }=this.props;

    console.log("props for welcome", this.props)

    return (
      <div className="container">

          <MyModal 
            showModal={this.state.showModal}
            body={this.state.modalBody}
            onAccept={ this.onClickAcceptBtnModal }
            onClose={ this.onClickCloseBtnModal }
          />

          <div className="fields-section">
            <div className="label-box"> <span>Select user:</span> </div>
            <div className="field-box">
              <UsersSelect users={users} onChangeSelectOption={ this.onChangeSelectOption }/>
            </div>
          </div>

          <div className="fields-section">
            <div className="label-box"> <span>Pick up a date:</span> </div>
            <div className="field-box">
              <UsersDatePicker date={this.state.startDate} onClickDatePicker={this.onClickDatePicker}/>
            </div>
          </div>

          <div className="fields-section">
            <span><b>Note:</b> Choose any user, pick a date within the range of the week you want to aprove or reject</span>
          </div>

          {
            ( weeks && weeks.length>0 ) ? ( <WeekDetails weeks={ weeks } /> )
            : <div></div>
          }
          
          <div className="fields-section buttons-section">
            <Button bsStyle="success" onClick={ ()=>{ this.onClickApproveOrDenyBtn("approve") } }>Accept</Button>
            <Button bsStyle="danger" onClick={ ()=>{ this.onClickApproveOrDenyBtn("reject") } }>Reject</Button>
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