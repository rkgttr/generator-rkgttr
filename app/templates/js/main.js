'use strict';

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


