<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-sm-12 flex flex-center">
        <h2 class="text-bold">Katakana</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 q-mb-xl" v-for="character in listOfKatakanaCharacters" :key="character.id">
        <q-card class="my-card no-shadow q-ma-xs">
          <q-card-section class="text-center text-bold character">
            <span class="character">{{ character.katakana }}</span>
          </q-card-section>
          <q-card-section class="text-center text-bold character">
            {{ character.romaji }}
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="menu"
        direction="up"
        color="black"
      >
        <q-fab-action @click="goToDashboard" color="primary" icon="dashboard" />
        <q-fab-action @click="goToTest" color="primary" icon="school" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>

import { mapState, mapActions } from 'vuex'

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
    goToDashboard () {
      this.$router.push({ path: '/' })
    },
    ...mapActions('katakana', {
      getListOfKatakanaCharactersVuex: 'getListOfKatakanaCharacters'
    })
  },
  computed: {
    ...mapState('katakana', ['listOfKatakanaCharacters'])
  }
}
</script>

<style lang="sass">
  .character
    font-size: 40px !important
</style>
