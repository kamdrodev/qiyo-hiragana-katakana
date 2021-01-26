<template>
  <q-page class="flex flex-center">
    <h1>Katakana</h1>
  </q-page>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageKatakana',
  async created () {
    try {
      const getListOfKatakanaCharacters = await this.getListOfKatakanaCharactersVuex()
      return this.$q.notify({ message: getListOfKatakanaCharacters.message, color: 'positive' })
    } catch (e) {
      console.log(e)
      return this.$q.notify({ message: e.message, color: 'negative' })
    }
  },
  methods: {
    ...mapActions('katakana', {
      getListOfKatakanaCharactersVuex: 'getListOfKatakanaCharacters'
    })
  },
  computed: {
    ...mapGetters('katakana', ['listOfKatakanaCharacters'])
  }
}
</script>
