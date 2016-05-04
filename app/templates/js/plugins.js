// Avoid `console` errors in browsers that lack a console.
( function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = ( window.console = window.console || {} );

  while ( length-- ) {
    method = methods[ length ];
    if ( !console[ method ] ) {
      console[ method ] = noop;
    }
  }
}() );

var HELPERS = HELPERS || {
  // use with document.location.search as parameter
  urlVariables: function ( qs ) {
    qs = qs.split( "+" ).join( " " );
    var params = {},
      tokens, re = /[?&]?([^=]+)=([^&]*)/g;
    while ( tokens = re.exec( qs ) ) {
      params[ decodeURIComponent( tokens[ 1 ] ) ] = decodeURIComponent( tokens[ 2 ] );
    }
    return params;
  },
  /**
   *
   * Media tracking method
   *
   * A media tag looks like this:
   * <script type='text/javascript'>
   * var ebRand = Math.random()+'';
   * ebRand = ebRand * 1000000;
   * //<![CDATA[
   * document.write('<scr'+'ipt src="HTTPs://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=479513&amp;rnd=' + ebRand + '"></scr' + 'ipt>');
   * //]]>
   * </script>
   * <noscript>
   * <img width="1" height="1" style="border:0" src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=479513&amp;ns=1"/>
   * </noscript>
   *
   * In order to emulate that tag, you need to isolate the url contained into the script tag without "HTTP:" and  use it as the trackingURL, for example:
   * HELPERS.mediaTrack('//bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=479513&amp;rnd=');
   *
   **/
  mediaTrack: function ( trackingURL ) {
    var scope = this;
    if ( trackingURL ) {
      var ebRand = Math.random();
      ebRand = ( ebRand * 1000000 );
      $.getScript( trackingURL + ebRand );
    }
  }

}
