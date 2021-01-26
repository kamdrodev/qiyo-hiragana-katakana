import axios from 'axios'

const state = {
  listOfHiraganaCharacters: []
}

const getters = {
  listOfHiraganaCharacters: (listOfHiraganaCharacters) => state.listOfHiraganaCharacters
}

const mutations = {
  setListOfHiraganaCharacters: (state, listOfHiraganaCharacters) => {
    state.listOfHiraganaCharacters = listOfHiraganaCharacters
  }
}

const actions = {
  async getListOfHiraganaCharacters ({ dispatch, commit }) {
    try {
      const getListOfHiraganaCharactersRequest = await axios.get('hiragana')

      commit('setListOfHiraganaCharacters', getListOfHiraganaCharactersRequest.data.hiragana)
      console.log('Check')
      console.log(getListOfHiraganaCharactersRequest.data)
      return {
        message: getListOfHiraganaCharactersRequest.data.message
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
