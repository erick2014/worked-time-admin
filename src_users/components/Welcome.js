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


import { fetchUsersRequest,fetchWeeksRequest,processWeekRequest,cleanUpProcessedWeek } from '../actions';

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
      modalMode:"validation",
      weekSelectedId:"",
      weekSelectedNumber:"",
      clickedBtnText:"",
      approvers:[]

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

  componentWillReceiveProps(nextProps){
    const { processedWeek }=nextProps;
    //check if we have any response from server to show up in modal
    if( processedWeek && Object.keys( processedWeek).length>0  ){
      let info={
        modalBody:`Your week has been ${processedWeek.status}`,
        showModal:true,
        modalMode:"informative"
      }
      this.showUpmodalWithInfo(info)
    }
      
  }

  componentWillMount(){
    //fetch users 
    this.props.dispatch( fetchUsersRequest() );
  }

  showUpResponseMessageInModal( processedWeek ){
    //set the message to show up in modal
    this.setState()
  }

  getWeekDetails( monthNumber,year ){
    //validate the user id
    if(!this.state.userId ){
      let info={ modalBody:`Please select an user`,showModal:true,modalMode:"informative" }
      this.showUpmodalWithInfo( info );
    }
    else{
      //reset modal mode
      this.setState({modalMode:"validation"})
      //dispatch an action to get all weeks using the selected user and month
      this.props.dispatch( fetchWeeksRequest( monthNumber, this.state.userId, year ) )
    }
    
  }

  onClickDatePicker(date) {
    let currentDate=date.format("l")
    let dateList=currentDate.split("/");
    this.setState({ startDate: date,selectedMonth:dateList[0],selectedDay:dateList[1] });
    this.getWeekDetails( dateList[0], dateList[2]);
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
    let approvers=[];

    //look for the corresponding week id using the choosen day in calendar
    for( var i=0;i<weeks.length;i++ ){
       let week=weeks[i];
       if( week.days_in_week.indexOf( selectedDayNum )!==-1 ){
         weekId= week["week_id"];
         weekNumber= week["week_number"];
         approvers= week["approvers"];
        break;
       }
    }

    if( weekId ) {
      let info={ 
        approvers:approvers,
        clickedBtnText:clickedBtn,
        weekSelectedId:weekId,
        weekSelectedNumber:weekNumber,
        modalBody:`The week #${weekNumber} is going to be ${clickedBtn}, is that ok?`,
        showModal:true
      }
      this.showUpmodalWithInfo( info );
    }
      
  }

  /*Close option handler for modal*/ 
  onClickCloseBtnModal(){
    this.setState({ showModal:false });
  }

  /*Accept option handler for modal*/
  onClickAcceptBtnModal(){
    
    let status="";
    let approverId="";

    const {  processedWeek,dispatch }=this.props

    if( this.state.modalMode=="validation" ){
      //validate if we have the approverId
      if( this.state.approvers && this.state.approvers.length>0 ) approverId=this.state.approvers[0];
      else return false;

      this.setState({showModal:false});
      //dispatch the action to approve or deny a week
      this.props.dispatch( processWeekRequest( this.state.weekSelectedId, approverId, this.state.clickedBtnText ) );
    }
    else if( this.state.modalMode=="informative" ){
      //close the modal
      this.setState({showModal:false,modalMode:"validation"})
      //check if we have some response from server to clean
      if( processedWeek && Object.keys( processedWeek).length>0  ) dispatch( cleanUpProcessedWeek()  )
    }

    
  }

  /*Open the modal and validate the clicked option*/ 
  showUpmodalWithInfo( info ){
    this.setState( info );
  }

  render() {
    const UsersDropdown="";
    let weekDetailsComp="";
    let weeksItems=[];
    const { users,weeks }=this.props;

    console.log("props weeks",weeks)

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
            <Button bsStyle="success" onClick={ ()=>{ this.onClickApproveOrDenyBtn("approved") } }>Accept</Button>
            <Button bsStyle="danger" onClick={ ()=>{ this.onClickApproveOrDenyBtn("rejected") } }>Reject</Button>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    weeks: state.weeks,
    currentUser: state.currentUser,
    processedWeek: state.processedWeek
  }
}

export default connect(mapStateToProps)(Welcome);