import axios from 'axios'

const state = {
  listOfKatakanaCharacters: []
}

const getters = {
  listOfKatakanaCharacters: (listOfKatakanaCharacters) => state.listOfHiraganaCharacters
}

const mutations = {
  setListOfKatakanaCharacters: (state, listOfKatakanaCharacters) => {
    state.listOfKatakanaCharacters = listOfKatakanaCharacters
  }
}

const actions = {
  async getListOfKatakanaCharacters ({ dispatch, commit }) {
    try {
      const getListOfKatakanaCharactersRequest = await axios.get('katakana')

      commit('setListOfKatakanaCharacters', getListOfKatakanaCharactersRequest.data.katakana)
      console.log('Check')
      console.log(getListOfKatakanaCharactersRequest.data)
      return {
        message: getListOfKatakanaCharactersRequest.data.message
      }
    } catch (e) {
      throw new Error(e.response.data.message)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
