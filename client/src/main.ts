// FILE: main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/mdi-v6'

// Import icon libraries; you can choose different ones!
// See: https://quasar.dev/start/vite-plugin#using-quasar
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from './router'
import axiosInstance from './plugins/axios'

import SQLite from './db'
import { fasB } from '@quasar/extras/fontawesome-v6'

const myApp = createApp(App)

myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    iconSet: quasarIconSet,
    /*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
})

// Connect Pinia
myApp.use(createPinia());

// Connect Vue Router
myApp.use(router);

// Assumes you have a <div id="app"></div> in your index.html
const db = new SQLite()
await db.initializeDB()
// await db.executeQuery(`
//   INSERT INTO RecordItem (id, title, description, barcode)
//   VALUES (?, ?, ?, ?);
// `, ['fkjfsd', 'Sample Title', 'Sample Description 1', '1234567890']);
// await db.executeQuery(`
//     INSERT INTO RecordItem (id, title, description, barcode)
//     VALUES (?, ?, ?, ?);
//   `, ['fjkd', 'Sample Title', 'Sample Description 2', '1234567891']);
//   await db.executeQuery(`
//     INSERT INTO RecordItem (id, title, description, barcode)
//     VALUES (?, ?, ?, ?);
//   `, ['djkfds', 'Sample Title', 'Sample Description 3', '1234567892']);

myApp.mount('#app')
