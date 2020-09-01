/* References
  API:              https://support.speedcurve.com/en/articles/867066-lux-api
  Customer Data:    https://support.speedcurve.com/en/articles/1262334-lux-customer-data
  Getting Started:  https://support.speedcurve.com/en/articles/1266080-get-started-with-lux-real-user-monitoring
  SPAs:             https://support.speedcurve.com/en/articles/1708068-using-lux-in-a-single-page-app-spa
  Sample Rate:      https://support.speedcurve.com/en/articles/2562938-setting-your-lux-sample-rate
*/

const buildOptions = <%= JSON.stringify(options.config) %>

export default function (ctx, inject) {
  const runtimeOptions = (ctx.$config && ctx.$config.lux) || {}
  const options = Object.assign(buildOptions, runtimeOptions)
  let ignoreLUX = false
  let isFirstHit = null
  let label = '' // undocumented - we actually need to default/update the label ourselves for SPAs

  ctx.$lux = {
    // If logFirstHit is true, then let LUX log the first hit and ignore it if user tries to do it themselves
    pageLoading(isLoading = true) {
      if (process.server || !window.LUX || (isFirstHit && options.logFirstHit) || ignoreLUX) { return }
      if (isLoading) { 
        window.LUX.init()
        label = ''
      } else {         
        // https://github.com/nuxt/nuxt.js/discussions/8004
        // LUX doesn't have a way to stop the timer and not send the beacon so we'll try to wait to get the resolved title        
        // Ideally SC LUX would let us start/stop, wait..update label.. then send whenever we wanted vs hard-coding send() and stop() as 1 function.  Then I'd make this 1s and call it good.
        // 20ms may not be good enough for those using transitions (not sure), but we don't really have a better choice right now.
        setTimeout(() => {
          window.LUX.label = label || document.title
          window.LUX.send()
        }, 20)
        
      }
    },
    label(newLabel) {
      if (process.server || !window.LUX || !newLabel || ignoreLUX) { return }      
      label = newLabel
    },
    addData(name, value) {
      if (process.server || !window.LUX || !name || typeof value === 'undefined' || ignoreLUX) { return }

      value = value.toString()

      if (options.translateBool) {
        if (value === 'true') { value = 'Yes' } else if (value === 'false') { value = 'No' }
      }

      window.LUX.addData(name, value)
    },
    // must be called before send()
    mark(name) {
      if (process.server || !window.LUX || !name || ignoreLUX) { return }
      window.LUX.mark(name)
    },
    // must be called before send()
    measure(name, startMark, endMark) {
      if (process.server || !window.LUX || !name || !startMark || !endMark || ignoreLUX) { return }
      window.LUX.measure(name, startMark, endMark)
    },
    // exposed in ctx so it can be overridden
    routerBeforeEach(to, from) {
      // Clean up and stop ignoring.  Leave this before the 'to' below just in case the user pushes to another route that's ignored too.
      if (from.params.ignoreLUX) {
        delete from.params.ignoreLUX
        ignoreLUX = false
      }

      // Sometimes users are just updating the url based on the current state (and not via query strings).  
      // Allow a param that they can use to ignore all calls until the next nav.
      // This allows users to keep all of their existing triggers/calls and not have to worry about manually disabling them under these conditions.      
      if (to.params.ignoreLUX) { ignoreLUX = true }

      // trigger the start timer for the user if they are going somewhere different.  No, this will not trigger for query string changes.
      if (options.autoStartOnNav && !isFirstHit && to.path != from.path && !ignoreLUX) {
        ctx.$lux.pageLoading()
      }
    }
  }

  // client side setup the auto starter if requested
  if (process.client && options.enabled) {
    ctx.app.router.beforeEach((to, from, next) => {
      isFirstHit = (isFirstHit === null)

      ctx.$lux.routerBeforeEach(to, from)
      next()
    })

  }
  // server side, inject the native LUX code on the fly
  else if (options.id && options.enabled) {
    ctx.beforeNuxtRender(() => {
      const head = ctx.app.head

      head.__dangerouslyDisableSanitizersByTagID = head.__dangerouslyDisableSanitizersByTagID || {}
      head.__dangerouslyDisableSanitizersByTagID['lux-init'] = ['innerHTML']

      head.script.unshift({
        hid: 'lux-src',
        src: `https://cdn.speedcurve.com/js/lux.js?id=${options.id}`,
        async: true,
        defer: true,
        crossorigin: 'anonymous',
        ...(options.isDev && { onload: 'LUX.forceSample()' })
      })

      head.script.unshift({
        hid: 'lux-options',
        innerHTML: `
          LUX.debug = ${options.debugMode}
          LUX.auto = ${options.logFirstHit}
          LUX.samplerate = ${options.sampleRate}
        `
      })

      head.script.unshift({
        hid: 'lux-init',
        innerHTML: '<%=options.luxInit %>'
      })
    })
  }

  inject('lux', ctx.$lux)
}