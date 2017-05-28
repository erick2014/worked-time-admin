import chai,{ expect } from "chai"
import { FETCH_USERS_SUCCESS } from '../../src_users/constants'
import {users} from '../../src_users/reducers/users'

describe('Users reducers:', () => {

  const testUsers = [
    { email:"user_1@aurity.co", id:1, username:"User_1" },
    { email:"user_2@aurity.co", id:1, username:"User_2" }
  ]

  it('(users) should return the initial state', () => {
    let reducerResponse=users(undefined, {});
    expect( reducerResponse ).to.eql( [] )
  })

  it('(users) should set users after successful request', () => {
    const action = {
      type: FETCH_USERS_SUCCESS,
      payload: {
        users: testUsers
      }
    }
    let reducerResponse=users([], action)
    expect( reducerResponse ).to.be.an("array");
    expect( reducerResponse ).to.have.lengthOf.above(1);
  })


  
})
