import chai,{ expect } from "chai"
import { FETCH_WEEKS_SUCCESS } from '../../src_users/constants'
import {weeks} from '../../src_users/reducers/weeks'

describe('weeks reducers:', () => {

  const testWeeks = [
    {
      "approvers":[2,3],
      "days_in_week":[15,16,17,18,19,20,21],
      "week_id":24,
      "week_number":20
    },
    {
      "approvers":[2,3],
      "days_in_week":[29,30,1,2,3,4],
      "week_id":26,
      "week_number":22
    }
  ]

  it('(weeks) should return the initial state', () => {
    let reducerResponse=weeks(undefined, {});
    expect( reducerResponse ).to.eql( [] )
  })

  it('(weeks) should set weeks after successful request', () => {
    const action = {
      type: FETCH_WEEKS_SUCCESS,
      payload: { weeks: testWeeks }
    }
    let reducerResponse=weeks([], action)
    expect( reducerResponse ).to.be.an("array");
    expect( reducerResponse ).to.have.lengthOf.above(1);
    expect( reducerResponse[0] ).to.deep.equal( {
      "approvers":[2,3],
      "days_in_week":[15,16,17,18,19,20,21],
      "week_id":24,
      "week_number":20
    }  )

  })


  
})
