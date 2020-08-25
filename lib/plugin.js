/* References
  API:              https://support.speedcurve.com/en/articles/867066-lux-api
  Customer Data:    https://support.speedcurve.com/en/articles/1262334-lux-customer-data
  Getting Started:  https://support.speedcurve.com/en/articles/1266080-get-started-with-lux-real-user-monitoring
  SPAs:             https://support.speedcurve.com/en/articles/1708068-using-lux-in-a-single-page-app-spa
  Sample Rate:      https://support.speedcurve.com/en/articles/2562938-setting-your-lux-sample-rate
*/
const buildOptions = <%= JSON.stringify(options) %>;

export default function (ctx, inject) {
  const runtimeOptions = (ctx.$config && ctx.$config.lux) || {}
  const options = Object.assign(buildOptions, runtimeOptions)
  let ignoreLUX = false
  let isFirstHit = null

  if (!options.enabled) { return }
  if (process.client && options.id) { injectLUX(options) }

  ctx.$lux = {
    // If logFirstHit is true, then let LUX log the first hit and ignore it if user tries to do it themselves
    pageLoading (isLoading = true) {
      if (process.server || !window.LUX || (isFirstHit && options.logFirstHit) || ignoreLUX) { return }   
      if (isLoading) { window.LUX.init() } else { window.LUX.send() }
    },
    label (label) {
      if ( process.server || !window.LUX || !label || ignoreLUX) { return }
      window.LUX.label = label
    },
    addData (name, value) {
      if ( process.server || !window.LUX || !name || typeof value === 'undefined' || ignoreLUX) { return }

      value = value.toString()

      if (options.translateBool) {
        if (value === 'true') { value = 'Yes' } else if (value === 'false') { value = 'No' }
      }

      window.LUX.addData(name, value)
    },
    // must be called before send()
    mark (name) {
      if (process.server || !window.LUX || !name || ignoreLUX) { return }
      window.LUX.mark(name)
    },
    // must be called before send()
    measure (name, startMark, endMark) {
      if (process.server || !window.LUX || !name || !startMark || !endMark || ignoreLUX) { return }
      window.LUX.measure(name, startMark, endMark)
    },
    // exposed in ctx so it can be overridden
    routerBeforeEach(to, from) {
      // Clean up and stop ignoring.  Leave this before the 'to' below just in case the user pushes to another route that's ignored too.
      if(from.params.ignoreLUX){
        delete from.params.ignoreLUX
        ignoreLUX = false
      }

      // Sometimes users are just updating the url based on the current state (and not via query strings).  
      // Allow a param that they can use to ignore all calls until the next nav.
      // This allows users to keep all of their existing triggers/calls and not have to worry about manually disabling them under these conditions.      
      if(to.params.ignoreLUX) { ignoreLUX = true }

      // trigger the start timer for the user if they are going somewhere different.  No, this will not trigger for query string changes.
      if(options.autoStartOnNav && !isFirstHit && to.path != from.path && !ignoreLUX){
        ctx.$lux.pageLoading()
      }
    }
  }

  if(process.client){
    ctx.app.router.beforeEach((to, from, next) => {
      isFirstHit = (isFirstHit === null)

      ctx.$lux.routerBeforeEach(to,from)
      next()
    })
  }

  inject('lux', ctx.$lux)
}

function injectLUX (options) {
  /* eslint-disable */
  const LUX = (function() {var a=("undefined"!==typeof(LUX)&&"undefined"!==typeof(LUX.gaMarks)?LUX.gaMarks:[]);var d=("undefined"!==typeof(LUX)&&"undefined"!==typeof(LUX.gaMeasures)?LUX.gaMeasures:[]);var j="LUX_start";var k=window.performance;var l=("undefined"!==typeof(LUX)&&LUX.ns?LUX.ns:(Date.now?Date.now():+(new Date())));if(k&&k.timing&&k.timing.navigationStart){l=k.timing.navigationStart}function f(){if(k&&k.now){return k.now()}var o=Date.now?Date.now():+(new Date());return o-l}function b(n){if(k){if(k.mark){return k.mark(n)}else{if(k.webkitMark){return k.webkitMark(n)}}}a.push({name:n,entryType:"mark",startTime:f(),duration:0});return}function m(p,t,n){if("undefined"===typeof(t)&&h(j)){t=j}if(k){if(k.measure){if(t){if(n){return k.measure(p,t,n)}else{return k.measure(p,t)}}else{return k.measure(p)}}else{if(k.webkitMeasure){return k.webkitMeasure(p,t,n)}}}var r=0,o=f();if(t){var s=h(t);if(s){r=s.startTime}else{if(k&&k.timing&&k.timing[t]){r=k.timing[t]-k.timing.navigationStart}else{return}}}if(n){var q=h(n);if(q){o=q.startTime}else{if(k&&k.timing&&k.timing[n]){o=k.timing[n]-k.timing.navigationStart}else{return}}}d.push({name:p,entryType:"measure",startTime:r,duration:(o-r)});return}function h(n){return c(n,g())}function c(p,o){for(i=o.length-1;i>=0;i--){var n=o[i];if(p===n.name){return n}}return undefined}function g(){if(k){if(k.getEntriesByType){return k.getEntriesByType("mark")}else{if(k.webkitGetEntriesByType){return k.webkitGetEntriesByType("mark")}}}return a}return{mark:b,measure:m,gaMarks:a,gaMeasures:d}})();LUX.ns=(Date.now?Date.now():+(new Date()));LUX.ac=[];LUX.cmd=function(a){LUX.ac.push(a)};LUX.init=function(){LUX.cmd(["init"])};LUX.send=function(){LUX.cmd(["send"])};LUX.addData=function(a,b){LUX.cmd(["addData",a,b])};const LUX_ae=[];window.addEventListener("error",function(a){LUX_ae.push(a)});const LUX_al=[];if("function"===typeof(PerformanceObserver)&&"function"===typeof(PerformanceLongTaskTiming)){var LongTaskObserver=new PerformanceObserver(function(c){var b=c.getEntries();for(var a=0;a<b.length;a++){var d=b[a];LUX_al.push(d)}});try{LongTaskObserver.observe({type:["longtask"]})}catch(e){}};
  window.LUX = LUX
  window.LUX_ae = LUX_ae
  window.LUX_al = LUX_al
  /* eslint-enable */

  window.LUX.debug = options.debugMode
  window.LUX.auto = options.logFirstHit
  window.LUX.samplerate = options.sampleRate

  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.crossOrigin = 'anonymous'
  script.src = `https://cdn.speedcurve.com/js/lux.js?id=${options.id}`
  script.onload = () => {
    // If you have < 100% in the SC Control panel that will always take precidence and if you've enabled this in dev mode you are trying to dev,
    // so make sure you are in the sample group!
    if (options.isDev) { window.LUX.forceSample() }
  }
  document.head.appendChild(script)
}
