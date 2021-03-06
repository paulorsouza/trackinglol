import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';
import 'fontsource-roboto';

// import whyDidYouRender from '@welldone-software/why-did-you-render';
// if (process.env.NODE_ENV !== 'production') {
//   whyDidYouRender(React);
// }

const renderApp = (NextApp) => {
  render(
    <NextApp />,
    document.getElementById('main-container')
  );
};

renderApp(AppContainer);



// // We need to import the CSS so that webpack will load it.
// // The MiniCssExtractPlugin is used to separate it out into
// // its own CSS file.
// import "../css/app.scss"

// // webpack automatically bundles all modules in your
// // entry points. Those entry points can be configured
// // in "webpack.config.js".
// //
// // Import deps with the dep name or local files with a relative path, for example:
// //
// //     import {Socket} from "phoenix"
// //     import socket from "./socket"
// //
// import "phoenix_html"
// import {Socket} from "phoenix"
// // import topbar from "topbar"
// import {LiveSocket} from "phoenix_live_view"
// import LiveReact, { initLiveReact } from "phoenix_live_react"

// let hooks = { LiveReact }

// let liveSocket = new LiveSocket("/live", Socket, { hooks, params: { _csrf_token: csrfToken } })

// let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
// // let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}})

// // Show progress bar on live navigation and form submits
// // topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
// // window.addEventListener("phx:page-loading-start", info => topbar.show())
// // window.addEventListener("phx:page-loading-stop", info => topbar.hide())

// document.addEventListener("DOMContentLoaded", e => {
//   initLiveReact()
// })

// // connect if there are any LiveViews on the page
// // liveSocket.connect()

// // expose liveSocket on window for web console debug logs and latency simulation:
// // >> liveSocket.enableDebug()
// // >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// // >> liveSocket.disableLatencySim()
// window.liveSocket = liveSocket

// import { MyComponent } from "./components/my_components"

// window.Components = {
//   MyComponent
// }

