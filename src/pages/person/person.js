import Vue from 'vue'
import Person from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#person',
  render: h => h(Person)
})