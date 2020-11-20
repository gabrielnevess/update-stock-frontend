import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import AppProvider from './hooks';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#26a9e0"
    },
    secondary: {
      main: "#f6921e"
    }
  }
});

const App: React.FC = () => (
  <Router>
    <MuiThemeProvider theme={theme}>

      <ToastContainer />
      <CssBaseline />

      <AppProvider>
        <Routes />
      </AppProvider>

    </MuiThemeProvider>
  </Router>
);

export default App;