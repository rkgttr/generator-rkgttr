'use strict';

/**
 *
 * Main Application
 *
 **/
class App_<%= camelname %> {
  constructor(){
    this.WIN = $(window);
    this.DOC = $(document);
    this.BODY = $('body');
    this.HTML = $('html');
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
    this.WIN.resize(function (event) {
      return event;
    });
    this.DOC.ajaxError(function (event, xhr, settings, thrownError) {
      this.onAjaxError(event, xhr, settings, thrownError);
      return arguments;
    }.bind(this));
    this.DOC.ajaxSuccess(function (event, xhr, settings) {
      this.onAjaxSuccess(event, xhr, settings);
      return arguments;
    }.bind(this));
  }

  /**
   *
   * React on any Ajax Error
   *
   **/
  onAjaxError (event, xhr, settings, thrownError) {
    return arguments;
  }

  /**
   *
   * React on any Ajax Success
   * DOM may be updated/changed
   *
   **/
  onAjaxSuccess (event, xhr, settings) {
    return arguments;
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


