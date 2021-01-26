<template>
  <q-page class="flex flex-center">
    <h1>Hiragana</h1>
  </q-page>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageHiragana',
  async created () {
    try {
      const getListOfHiraganaCharacters = await this.getListOfHiraganaCharactersVuex()
      return this.$q.notify({ message: getListOfHiraganaCharacters.message, color: 'positive' })
    } catch (e) {
      console.log(e)
      return this.$q.notify({ message: e.message, color: 'negative' })
    }
  },
  methods: {
    ...mapActions('hiragana', {
      getListOfHiraganaCharactersVuex: 'getListOfHiraganaCharacters'
    })
  },
  computed: {
    ...mapGetters('hiragana', ['listOfHiraganaCharacters'])
  }
}
</script>
