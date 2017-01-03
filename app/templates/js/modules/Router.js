/**
 * Usage:
 *
 * import Router from 'Router';
 * let router = new Router(() => defaultBehaviour());
 * router.addRoute('/route', (...args) => doSomethingWhenUsingThatRoute());
 * router.addRoute('/route/:dynamic-prop/path/:other-prop', (dynProp, otherProp) => doSomething(dynProp, otherProp));
 * router.addRoutes({route:'/route/:dynamic-prop/path/:other-prop', handler: (dynProp, otherProp) => doSomething(dynProp, otherProp)}, {route:'/route/:dynamic-prop', handler: (dynProp) => doSomething(dynProp)});
 *
 * // internal call example (when not clicked on a link that has an anchor)
 * router.callRoute('#!/route/path/1523');
 * 
 */


export default class {
  /**
    defaultHandler: callback to execute when the supplied route doesn't exist
  */
  constructor(defaultHandler = ()=> {}) {
    if(window.routerInstance === undefined) {
      window.routerInstance = this;
      this.routes = [];
      this.matchers = [];
      this.lookup = {};
      this.default = () => defaultHandler();
      this.currentRoute = {
        route: '',
        results: []
      };
      let setLocation = e => {
          let hash = (e.newURL || document.location.hash).slice((e.newURL || document.location.hash).indexOf('#')),
            matches = 0;
          this.matchers.forEach((matcher, i) => {
            let result = hash.match(matcher);
            if (result && result.length > matches) {
              matches = result.length;
              this.currentRoute.route = this.routes[i];
              this.currentRoute.result = result.filter(r => typeof r === 'string').slice(1);
              this.currentRoute.result.push(e);
            }
          });
          return typeof this.lookup[this.currentRoute.route] === 'function' && matches > 0 ? this.lookup[this.currentRoute.route]() : this.default();
        };
      window.addEventListener('hashchange', setLocation);
      window.dispatchEvent(new Event('hashchange'));
    }
    return window.routerInstance;
  }

  /**
   * Manually trigger a navigation
   * @param  {String} route Your url hash such as '#!/route/param'
   */
  callRoute(route) {
    if(route.indexOf('#') !== 0) {
      throw new Error('Your route should start with a #');
    }
    document.location.href = route;
  }

  /**
    Add one route
    route(String): pattern starting with a slash such as /route/:dynamic-param/path/:other-param
    handler(Function): function to call when the route is reached
  */
  addRoute(route, handler) {
    if(route.indexOf('#') !== 0) {
      throw new Error('Your route should start with a #');
    }
    this.routes.push(route);
    this.matchers.push(new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)')));
    this.lookup[route] = () => handler(...this.currentRoute.result);
    window.dispatchEvent(new Event('hashchange'));
  }

  /**
    Add several routes at once
    ...routes: list of routeObj that contain two properties:
      - route(String): pattern starting with a slash such as /route/:dynamic-param/path/:other-param
      - handler(Function): function to call when the route is reached
  */
  addRoutes(...routes) {
    routes.forEach((routeObj)=> {
      if(routeObj.route.indexOf('#') !== 0) {
        throw new Error('Your route should start with a #');
      }
      this.routes.push(routeObj.route);
      this.matchers.push(new RegExp(routeObj.route.replace(/:[^\s/]+/g, '([\\w-]+)')));
      this.lookup[routeObj.route] = () => routeObj.handler(...this.currentRoute.result);
      window.dispatchEvent(new Event('hashchange'));
    });
  }

}



