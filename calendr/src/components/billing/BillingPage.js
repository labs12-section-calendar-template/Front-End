import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckOutForm from './CheckOutForm';
import './billing.scss'


class BillingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

     <StripeProvider apiKey="pk_test_Nz6oYTpIVthIS5W8jol7pd9Y00gIlzGMsm">
        <div className="billing-card">
          <h1>React Stripe</h1>
          <Elements>
            <CheckOutForm />
          </Elements>
        </div>
      </StripeProvider>
         );
    }
}
 
export default BillingPage;