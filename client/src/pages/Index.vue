<template>
  <q-page class="q-pa-md row flex flex-center">

      <div class="col-sm-12 col-md-6 flex flex-center">
        <q-card class="my-card no-shadow">
          <q-tabs v-model="tab" class="text-black center no-shadow">
            <q-tab label="Hiragana" name="tabHiragana" class="no-shadow"/>
            <q-tab label="Katakana" name="tabKatakana" />
          </q-tabs>
          <!-- {{ hiragana }} -->
          <!-- {{ this.$store.getters['hiragana/listOfHiraganaCharacters'] }} -->

          <q-tab-panels v-model="tab" animated class="flex flex-center no-shadow">
            <q-tab-panel name="tabHiragana" class="no-shadow">
              <q-carousel
                v-model="sliderHiragana"
                swipeable
                arrows
                animated
                :navigation-position="navPos"
                padding
                control-color="black"
                height="300px"
                class="rounded-borders slider hiragana"
              >
              <q-carousel-slide  class="column no-wrap flex-center" v-for="hiragana in listOfHiraganaCharacters" :key="hiragana.id" :name="hiragana.id">
                <div class="q-mt-md hiragana character">
                  {{ hiragana.hiragana }}
                </div>
                <div class="q-mt-md romaji character ">
                  {{ hiragana.romaji }}
                </div>
              </q-carousel-slide>
              </q-carousel>
            </q-tab-panel>
            <q-tab-panel name="tabKatakana">
              <q-carousel
                v-model="sliderKatakana"
                swipeable
                arrows
                animated
                :navigation-position="navPos"
                padding
                control-color="black"
                height="300px"
                class="rounded-borders slider hiragana"
              >
              <q-carousel-slide  class="column no-wrap flex-center" v-for="katakana in listOfKatakanaCharacters" :key="katakana.id" :name="katakana.id">
                <div class="q-mt-md hiragana character">
                  {{ katakana.katakana }}
                </div>
                <div class="q-mt-md romaji character ">
                  {{ katakana.romaji }}
                </div>
              </q-carousel-slide>
              </q-carousel>

            </q-tab-panel>
          </q-tab-panels>
          <q-card-actions align="right">
            <q-btn flat round color="green" icon="view_module" @click="showAllCharacters" />
            <q-btn flat round color="red" icon="school" @click="startTest" />
          </q-card-actions>
        </q-card>
    </div>
  </q-page>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  async created () {
    try {
      const getListOfHiraganaCharacters = await this.getListOfHiraganaCharactersVuex()
      const getListOfKatakanaCharacters = await this.getListOfKatakanaCharactersVuex()
      this.sliderHiragana = this.listOfKatakanaCharacters[0].id
      this.sliderKatakana = this.listOfKatakanaCharacters[0].id
      return this.$q.notify({ message: `${getListOfHiraganaCharacters.message} ${getListOfKatakanaCharacters.message}`, color: 'positive' })
    } catch (e) {
      return this.$q.notify({ message: e.message, color: 'negative' })
    }
  },
  data: () => ({
    tab: 'tabHiragana',
    navPos: 'bottom',
    navigationPositions: [
      { value: 'top', label: 'top' },
      { value: 'right', label: 'right' },
      { value: 'bottom', label: 'bottom (default)' },
      { value: 'left', label: 'left' }
    ],
    sliderHiragana: '',
    sliderKatakana: '',
    lorem: 'Hello World'
  }),
  methods: {
    ...mapActions('hiragana', {
      getListOfHiraganaCharactersVuex: 'getListOfHiraganaCharacters'
    }),
    ...mapActions('katakana', {
      getListOfKatakanaCharactersVuex: 'getListOfKatakanaCharacters'
    }),
    showAllCharacters () {
    },
    startTest () {
    }
  },
  computed: {
    ...mapState('hiragana', ['listOfHiraganaCharacters']),
    ...mapState('katakana', ['listOfKatakanaCharacters'])
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    min-width: 100%
  .red
    background-color: red !important
  .slider
    &.hiragana
      .character
        &.hiragana
          font-size: 90px
        &.romaji
          font-size: 50px
</style>
