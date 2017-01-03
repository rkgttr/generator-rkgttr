<% if (includeRouter){ %> import Router from 'Router';<% } %>
<% if (includeModal){ %> import Modal from 'Modal';<% } %>

<% if (includeJquery){ %> import 'jquery';<% } %>
import * as Q from 'Q';
import * as Helpers from 'Helpers';


// uncomment following line if script fails in Internet Explorer, or other
// import 'babel-polyfill';

// uncomment following line if you need to polyfill Element.matches, for IE support and prefixed matches
// import 'MatchesPolyfill';
 
// uncomment following line if you need to polyfill WeakMap, for IE support, useless if you include babel-polyfill
// import 'WeakMapPolyfill';

// uncomment following line if you need to polyfill Element.classList, for IE9 support
// import 'ClassListPolyfills;

// uncomment following line if you need to polyfill Console, for IE9 support
// import 'ConsolePolyfills';

// uncomment following line if you need to polyfill MutationObserver, for IE10 support
// import 'MutationObserverPolyfill';


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


