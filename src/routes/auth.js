import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const Signup = lazy(() => import('../container/profile/authentication/overview/Signup'));
const Signup3 = lazy(() => import('../container/profile/authentication/overview/SignupPage3'));

function FrontendRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Signup} />
        <Route path="/finish" component={Signup3} />
      </Suspense>
    </Switch>
  );
}

export default AuthLayout(FrontendRoutes);
