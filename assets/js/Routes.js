import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const PlayersContainer = lazy(() => import('./containers/Players'));
const MvpGifScan = lazy(() => import('./containers/MvpGifScan'));
const TeamGifScan = lazy(() => import('./containers/TeamGifScan'));
const LiveStream = lazy(() => import('./containers/LiveStream'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/players" component={PlayersContainer} />
          <Route path="/live_stream" component={LiveStream} />
          <Route path="/mvp" component={MvpGifScan} />
          <Route path="/best_team" component={TeamGifScan} />
          <Route path="/" component={PlayersContainer} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
