<template>
  <q-layout view="lHh Lpr lFf">

    <!-- <q&#45;header elevated> -->
    <!--   <q&#45;toolbar> -->
    <!--     <q&#45;btn -->
    <!--       flat -->
    <!--       dense -->
    <!--       round -->
    <!--       icon="menu" -->
    <!--       aria&#45;label="Menu" -->
    <!--       @click="leftDrawerOpen = !leftDrawerOpen" -->
    <!--     /> -->
    <!--  -->
    <!--     <q&#45;toolbar&#45;title> -->
    <!--       Qiyo -->
    <!--     </q&#45;toolbar&#45;title> -->
    <!--   </q&#45;toolbar> -->
    <!-- </q&#45;header> -->
    <!--  -->
    <!-- <q&#45;drawer -->
    <!--   v&#45;model="leftDrawerOpen" -->
    <!--   show&#45;if&#45;above -->
    <!--   bordered -->
    <!--   content&#45;class="bg&#45;grey&#45;1" -->
    <!-- > -->
    <!--   <q&#45;list> -->
    <!--     <q&#45;item&#45;label -->
    <!--       header -->
    <!--       class="text&#45;grey&#45;8" -->
    <!--     > -->
    <!--       Qiyo -->
    <!--     </q&#45;item&#45;label> -->
    <!--     <q&#45;item -->
    <!--       clickable -->
    <!--       to="/hiragana" -->
    <!--     > -->
    <!--       <q&#45;item&#45;section avatar> -->
    <!--         <q&#45;icon name="dashboard" /> -->
    <!--       </q&#45;item&#45;section> -->
    <!--       <q&#45;item&#45;section> -->
    <!--         <q&#45;item&#45;label>Hiragana</q&#45;item&#45;label> -->
    <!--       </q&#45;item&#45;section> -->
    <!--     </q&#45;item> -->
    <!--     <q&#45;item -->
    <!--       clickable -->
    <!--       to="/katakana" -->
    <!--     > -->
    <!--       <q&#45;item&#45;section avatar> -->
    <!--         <q&#45;icon name="dashboard" /> -->
    <!--       </q&#45;item&#45;section> -->
    <!--       <q&#45;item&#45;section> -->
    <!--         <q&#45;item&#45;label>Katakana</q&#45;item&#45;label> -->
    <!--       </q&#45;item&#45;section> -->
    <!--     </q&#45;item> -->
    <!--   </q&#45;list> -->
    <!-- </q&#45;drawer> -->
    <!--  -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    color: #000000;
  }
</style>
