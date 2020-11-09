import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Provider} from 'react-redux';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import HouseMaintView from './components/HouseMaintView';
import reducer from './store/reducers/reducer';
import notificationReducer from './store/reducers/notificationReducer';

const App = () => {  
  const rootReducer = combineReducers({
    reducer,
    notificationReducer
  });

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <div className="App">
        <HouseMaintView />
      </div>
    </Provider>
  );
}

export default App;
