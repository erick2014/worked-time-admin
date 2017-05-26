import React,{ Component } from "react";
import { connect } from "react-redux";
import "../stylesheets/welcome.css";
// import { listWelcomeItems } from "../actions/welcome";

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
    return (
      <div className="test">
        Home page here..
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

export default connect(mapStateToProps)(Welcome)



// export default Welcome;
