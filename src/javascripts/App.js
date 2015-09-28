/* Static dependencies */
import '../index.html';
// import '../stylesheets/base';

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

const history = useBasename(createHistory)({
  basename: ''
})

// class User extends React.Component {
//   render() {
//     let { userID } = this.props.params
//     let { query } = this.props.location
//     let age = query && query.showAge ? '33' : ''

//     return (
//       <div className='User'>
//         <h1>User id: {userID}</h1>
//         {age}
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <ul>
//           <li><Link to='/user/bob' activeClassName='active'>Bob</Link></li>
//           <li><Link to='/user/bob' query={{ showAge: true }} activeClassName='active'>Bob With Query Params</Link></li>
//           <li><Link to='/user/sally' activeClassName='active'>Sally</Link></li>
//         </ul>
//         {this.props.children}
//       </div>
//     )
//   }
// }

// React.render((
//   <Router history={history} >
//     <Route path='/' component={App}>
//       <Route path='user/:userID' component={User} />
//     </Route>
//   </Router>
// ), document.getElementById('main'))

// <DefaultRoute path='setup' component={ SetupLevel } />

React.render(
  <Router history={ history } >
    <Route path='/' component={ ConcentrationGameApp }>
    	<IndexRoute component={ SetupLevel } />
      <Route path='setup'          component={ SetupLevel }/>
      <Route path='play/:pairsNum' component={ Play }/>
      <Route path='results'        component={ Results }/>
      <Route path='*' component={ NoMatch }/>
    </Route>
  </Router>
, document.getElementById('main'));
