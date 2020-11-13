import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { CssBaseline } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => (
  <Router>
    <ToastContainer />
    <CssBaseline />

    <Routes />
  </Router>
);

export default App;