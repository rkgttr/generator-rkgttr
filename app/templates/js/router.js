/**
 * Usage:
 *
 * let router = new Router(() => defaultBehaviour());
 * router.addRoute('/route', (...args) => doSomethingWhenUsingThatRoute());
 * router.addRoute('/route/:dynamic-prop/path/:other-prop', (dynProp, otherProp) => doSomething(dynProp, otherProp));
 * router.addRoutes({route:'/route/:dynamic-prop/path/:other-prop', handler: (dynProp, otherProp) => doSomething(dynProp, otherProp)}, {route:'/route/:dynamic-prop', handler: (dynProp) => doSomething(dynProp)});
 *
 * // internal call example (when not clicked on a link that has an anchor)
 * history.pushState(null, null, '#!/route/path/1523');
 * 
 */

let routerInstance = null;

class Router {
  /**
    defaultHandler: callback to execute when the supplied route doesn't exist
  */
  constructor(defaultHandler) {
    if (!routerInstance) {
      routerInstance = this;
      this.routes = [];
      this.matchers = [];
      this.lookup = {};
      this.default = () => defaultHandler();
      this.currentRoute = {
        route: '',
        results: []
      };
      let setLocation = (hash) => {
          hash = hash.slice(hash.indexOf('/'));
          let matches = 0;
          this.matchers.forEach((matcher, i) => {
            let result = hash.match(matcher);
            if (result && result.length > matches) {
              matches = result.length;
              this.currentRoute.route = this.routes[i];
              this.currentRoute.result = result.filter(r => typeof r === 'string').slice(1);
            }
          });
          return typeof this.lookup[this.currentRoute.route] === 'function' ? this.lookup[this.currentRoute.route]() : this.default();
        },
        pushState = history.pushState;
      history.pushState = (state, title, url) => {
        setLocation(url);
        return pushState.call(history, state, title, url);
      };
      window.addEventListener('hashchange', () => setLocation(window.location.hash));
    }

    return routerInstance;
  }

  /**
    Add one route
    route(String): pattern starting with a slash such as /route/:dynamic-param/path/:other-param
    handler(Function): function to call when the route is reached
  */
  addRoute(route, handler) {
    this.routes.push(route);
    this.matchers.push(new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)')));
    this.lookup[route] = () => handler(...this.currentRoute.result);
  }

  /**
    Add several routes at once
    ...routes: list of routeObj that contain two properties:
      - route(String): pattern starting with a slash such as /route/:dynamic-param/path/:other-param
      - handler(Function): function to call when the route is reached
  */
  addRoutes(...routes) {
    routes.forEach((routeObj)=> {
      this.routes.push(routeObj.route);
      this.matchers.push(new RegExp(routeObj.route.replace(/:[^\s/]+/g, '([\\w-]+)')));
      this.lookup[routeObj.route] = () => routeObj.handler(...this.currentRoute.result);
    });
  }

}



