import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckOutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          complete: false
        };
    }

    
  submit = async (event) => {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    // let response = await fetch (`${process.env.REACT_APP_API}/charge`, {
    //   method: 'POST',
    //   headers: {"Content-Type": "application/json"},
    //   body: token.id
    // });
    axios.post(`${process.env.REACT_APP_API}/charge`, {tokenId: token.id}).then(res => console.log(res)).catch(err => console.log(err))
    // if (response.ok) console.log("Purchase Complete!")

  }

    render() { 

      if (this.state.complete) return <h1>Purchase Complete</h1>;
        return ( 

          <div className="checkout">
            <p>Ready to complete your transaction?</p>
            <CardElement/>
            <button onClick={this.submit}>Submit</button>
          </div>

         );
    }
}
 
export default injectStripe(CheckOutForm);