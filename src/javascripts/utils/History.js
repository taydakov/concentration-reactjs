import { createHistory, useBasename } from 'history';

// Use history object in <Router history={ history }> to use clean URLs
const history = useBasename(createHistory)({
  basename: ''
})