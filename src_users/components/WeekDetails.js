import React,{ Component } from "react";
import { FormControl } from "react-bootstrap";

// App component
class WeekDetails extends Component {
  
  constructor(props){
    super(props);
  }
  
  render(){
    const { weeks }=this.props
    let weeksItems="";
    let weeksItemsComp="";

     if( weeks && weeks.length>0 ){
       
      weeksItems=weeks.map( (week,index)=>{
        // let daysInWeek=week.days_in_week;
        //get each day within the week
        let daysInWeek=week.days_in_week.map( (day)=> day.day_number );
        daysInWeek=daysInWeek.join();
        return <div key={index}>
                  <div>Week <span>{week.week_number}, Days: {daysInWeek}</span></div>
                </div>
      })

      weeksItemsComp=
        <div>
          <div className="weeks-title">We found the following weeks:</div>
          { weeksItems }
        </div>
      
    }

    return(
      <div> {weeksItemsComp}  </div>
    )
  }
    
  
}

export default WeekDetails;