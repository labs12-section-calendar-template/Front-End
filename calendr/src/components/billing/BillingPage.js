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
         <div className='billing-container'>
         <MainNavBar logOff={this.props.logOff} />
         <br/>
         <br/>
         <br/>
         <div className= "instructions">
            <h3>
                  Here's What's Included for $9.99:
            </h3>
              
            <h4>Ability to add up to 5 groups.</h4>
          </div>
              
     <StripeProvider apiKey="pk_test_Nz6oYTpIVthIS5W8jol7pd9Y00gIlzGMsm">
        <div className="billing-card">
         
         
          <Elements>
            <CheckOutForm />
          </Elements>
        </div>
      </StripeProvider>
      </div>
         );
    }
}
 
export default BillingPage;