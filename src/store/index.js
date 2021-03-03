import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cookie: '',
  playlist: [],
  artist: null
}

export default new Vuex.Store({
  state,
  mutations: {
    addArtist (state, artist) {
      state.artist = artist
    }

  }

})
