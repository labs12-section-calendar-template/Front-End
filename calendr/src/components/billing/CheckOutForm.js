import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axiosCustom from '../../axiosCustom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import ColumnGroup from 'antd/lib/table/ColumnGroup';

class CheckOutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          complete: false,
          premiumStatus: 0
        };
    }

    componentDidMount = () => {
      this.getUserMembershipStatus()
    }

    getUserMembershipStatus = () => {
      let UserId = localStorage.getItem('userId')
      axios.get(`${process.env.REACT_APP_API}/users/${UserId}`, { headers:{Authorization: localStorage.getItem('jwt')}},)
      .then(res => {
       this.setState({
         premiumStatus: res.data.premiumStatus
       })
        console.log(res.data.premiumStatus)
       
      })
      .catch(err => {
        console.log(err)
      })
    }

    //submit
  submit = async (event) => {
    let UserId = localStorage.getItem('userId')
    let {token} = await this.props.stripe.createToken({name: "Name"});
    if(this.state.premiumStatus == true) {
      toast.error('Please enter a valid credit card')
    } else {
    axiosCustom.post(`${process.env.REACT_APP_API}/charge/${UserId}`, {tokenId: token.id})
    .then(res => {
     this.setState({
       complete: true
     })
    })
    .catch(err => {
     
      console.log(err)
    })
  }
  }

    render() { 
      let groupId = localStorage.getItem('group_id')
      if(this.state.premiumStatus == true) {
        return <h1>YOU HAVE ALREADY PAID FOR PREMIUM MEMBERSHIP</h1>
      } else {
      if (this.state.complete) return <div><h1>Purchase Complete</h1> <button onClick={()=> { window.location=`/home/${groupId}`}}>Take Me Home</button> </div>
        return ( 

          <div className="checkout">
          
            <p>Ready to complete your transaction?</p>
            <CardElement/>
            <button className='billing-button' onClick={this.submit}>Submit</button>
          </div>

         );
    }
  }
}
 
export default injectStripe(CheckOutForm);