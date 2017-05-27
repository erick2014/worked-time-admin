import React,{ Component } from "react";
import { FormControl } from "react-bootstrap";

// App component
class UsersSelect extends Component {
  
  constructor(props){
    super(props);
  }
  
  render(){
    const { users,onChangeSelectOption }=this.props

    const usersItems=users.map( (user,index)=>{
      let option=<option value={user.id} key={index}>{user.username}</option>
      return option;
    })

    return(
      <FormControl componentClass="select" placeholder="select" onChange={onChangeSelectOption}>
        <option value="">Select</option>
        {usersItems}
      </FormControl>
    )
  }
    
  
}

export default UsersSelect;