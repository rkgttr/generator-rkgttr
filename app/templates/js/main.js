<% if (includeRouter){ %> import Router from 'Router';<% } %>
<% if (includeModal){ %> import Modal from 'Modal';<% } %>
<% if (includeJquery){ %> import 'jquery';<% } %>
import * as Helpers from 'Helpers';

import * as Q from 'rkgttr-q';
import Publisher from 'rkgttr-publisher';
import uuid from 'rkgttr-uuid';
import Prng from 'rkgttr-prng';

// Uncomment the following if you wish to use the Elements module, add the elements you want to unlock in the {}
// import { div, img, h2, p, a } from 'rkgttr-elements';

// uncomment the following line if script fails in Internet Explorer, or other, due to ES6 features that need the Babel Polyfill
// import 'babel-polyfill';

// uncomment some of the following lines if you wish to use some specific polyfills
// import 'rkgttr-weakmappolyfill';
// import 'rkgttr-mutationobserverpolyfill';
// import 'rkgttr-matchespolyfill';
// import 'rkgttr-consolepolyfill';
// import 'rkgttr-classlistpolyfill';
// import 'rkgttr-arrayincludespolyfill';
// import 'rkgttr-arrayfrompolyfill';


/**
 *
 * Main Application
 *
 **/
class App_<%= camelname %> {
  constructor(){
    this.INITED = false;
    if(App_<%= camelname %>.instance !== undefined) {
      return App_<%= camelname %>.instance;
    } else {
      App_<%= camelname %>.instance = this;
    }
    return this;
  }
  /**
  *
  * Singleton thing
  *
  **/
  static getInstance(){
    if(App_<%= camelname %>.instance === undefined) {
      new App_<%= camelname %>();
    }
    return App_<%= camelname %>.instance;
  }
  /**
   *
   * Initialize your app, surcharge with whatever needed
   *
   **/
  init () {
    if(!this.INITED) {
      this.INITED = true;
      <% if (includeModal){ %> Modal();<% } %>
      <% if (includeRouter){ %>let router = new Router();<% } %>
      this.addListeners();
    }
  }

  /**
   *
   * Event Listeners, surcharge with whatever needed
   *
   **/
  addListeners () {

  }


  /**
   *
   * Declare new methods in such way
   *
   **/
  doSomething () {
    // code here
  }
}
App_<%= camelname %>.instance = undefined;

/**
 *
 * Launch the application
 *
 **/
App_<%= camelname %>.getInstance().init();
