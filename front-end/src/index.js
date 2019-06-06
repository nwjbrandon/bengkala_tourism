import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import About from './routers/about';
import Accommodation from './routers/accommodation';
import Admin from './routers/admin';
import Home from './routers/home';
import Attraction from './routers/attraction';
import Contact from './routers/contact';
import Faq from './routers/faq';
import Notfound from './routers/notfound';
import Payment from './routers/payment';
import Dashboard from './routers/admin/dashboard';
import DashboardAbout from './routers/admin/dashboard/about';
import DashboardAccommodation from './routers/admin/dashboard/accommodation';
import DashboardAttraction from './routers/admin/dashboard/attraction';
import DashboardContact from './routers/admin/dashboard/contact';
import DashboardFAQ from './routers/admin/dashboard/faq';
import DashboardHome from './routers/admin/dashboard/home';
import DashboardPayment from './routers/admin/dashboard/payment';
import DashboardSettings from './routers/admin/dashboard/settings';
import allReducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

// https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/todos?from-embed

const store = createStore(
    persistedReducer,
    composeWithDevTools(),
);

const persistor = persistStore(store);


const routing = (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/accommodation" component={Accommodation} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/attraction" component={Attraction} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/about" component={DashboardAbout} />
            <Route exact path="/dashboard/accommodation" component={DashboardAccommodation} />
            <Route exact path="/dashboard/attraction" component={DashboardAttraction} />
            <Route exact path="/dashboard/contact" component={DashboardContact} />
            <Route exact path="/dashboard/faq" component={DashboardFAQ} />
            <Route exact path="/dashboard/home" component={DashboardHome} />
            <Route exact path="/dashboard/payment" component={DashboardPayment} />
            <Route exact path="/dashboard/settings" component={DashboardSettings} />
            <Route component={Notfound} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();
