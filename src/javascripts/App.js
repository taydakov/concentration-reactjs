/* Static dependencies */
import '../index.html';
// import '../stylesheets/style';

/* JS dependencies */
import React from 'react';
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router';
/** Components **/
import ConcentrationGameApp from './components/ConcentrationGameApp';
import SetupLevel from './components/SetupLevel';
import Play from './components/Play';
import Results from './components/Results';
import NoMatch from './components/NoMatch';

// Use history object in <Router history={ history }> to use clean URLs
// const history = useBasename(createHistory)({
//   basename: ''
// })

React.render(
  <Router >
    <Route path='/' component={ ConcentrationGameApp }>
    	<IndexRoute component={ SetupLevel } />
      <Route path='setup'          component={ SetupLevel }/>
      <Route path='play'           component={ Play }/>
      <Route path='play/:pairsNum' component={ Play }/>
      <Route path='results'        component={ Results }/>
      <Route path='*' component={ NoMatch }/>
    </Route>
  </Router>
, document.getElementById('main'));
