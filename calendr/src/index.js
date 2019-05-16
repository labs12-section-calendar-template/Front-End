import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(

    <Router>
        <ToastContainer />
        <App />
    </Router>, document.getElementById('root'));
