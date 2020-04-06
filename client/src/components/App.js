import React, { Suspense } from 'react';
import { Switch, Route } from "react-router-dom";
import Auth from 'hoc/auth';
// pages for this product
import LandingPage from 'components/LandingPage';
import LoginPage from 'components/LoginPage';
import RegisterPage from 'components/RegisterPage';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

function App() {
  return (
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div style={{display: 'flex', paddingTop: '3.5rem', minHeight: 'calc(100vh - 80px'}}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null, true)}/>
            <Route exact path="/login" component={Auth(LoginPage, false)}/>
            <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          </Switch>
        </div>
        <Footer />
      </Suspense>
  );
}

export default App;
