import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'crawling',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Crawling = require('./containers/CrawlingContainer').default
      const reducer = require('./modules/crawling').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'data', reducer })

      /*  Return getComponent   */
      cb(null, Crawling)

    /* Webpack named bundle   */
    }, 'crawling')
  }
})
