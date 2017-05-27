import React,{ Component } from "react";
/*date picker stuff*/
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

// App component
class UsersDatePicker extends Component {
  
  constructor(props){
    super(props);
  }
  
  render(){
    const { onClickDatePicker,date }=this.props
    return(
      <DatePicker className="input-box" selected={date} onChange={ onClickDatePicker  }/>
    )
  }
    
  
}

export default UsersDatePicker;