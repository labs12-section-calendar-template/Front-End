import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckOutForm from './CheckOutForm';
import './billing.scss'
import MainNavBar from '../general/MainNavBar'


class BillingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
         <>
         <MainNavBar logOff={this.props.logOff} />
         <br/>
         <br/>
         <br/>
         <h3 id="instructions">
                  Here's what's included in the $9.99/Month Premium Plan:
                </h3>
              
                <h4>Ability to add up to 5 groups.</h4>
              
     <StripeProvider apiKey="pk_test_Nz6oYTpIVthIS5W8jol7pd9Y00gIlzGMsm">
        <div className="billing-card">
         
          <h1>React Stripe</h1>
          <Elements>
            <CheckOutForm />
          </Elements>
        </div>
      </StripeProvider>
      </>
         );
    }
}
 
export default BillingPage;