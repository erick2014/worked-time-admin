import React,{ Component } from "react";
import { connect } from "react-redux";
import { FormControl } from "react-bootstrap";
import "../stylesheets/welcome.css";

import { fetchUsersRequest } from '../actions';

// App component
class Welcome extends Component {
  componentWillMount(){
    console.log("component will mount... fetch the data..")
    this.props.dispatch( fetchUsersRequest() )
  }
  // render
  render() {
    console.log("component props..",this.props)
    const UsersDropdown="";
    const { users:{users} }=this.props;


    const usersItems=users.map( (user)=>{
      let option=<option>{user.username}</option>
      return option;
    } )

    console.log("usersItems ", usersItems)
    return (
      <div className="test">
          <div className="search-box">
            <span>Select user: </span>
            <div className="user-dropdown">
              <FormControl componentClass="select" placeholder="select">
                {usersItems}
              </FormControl>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Welcome);