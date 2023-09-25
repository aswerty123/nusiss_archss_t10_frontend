import rootReducer from './reducers/root-reducer';
import thunk from 'redux-thunk';
// import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));

export { store };