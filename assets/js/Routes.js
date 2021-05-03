import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const PlayersContainer = lazy(() => import('./containers/Players'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/" component={PlayersContainer} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
