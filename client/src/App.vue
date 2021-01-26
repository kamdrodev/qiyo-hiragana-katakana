<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    this.$q.notify.setDefaults({
      position: 'top-right'
    })
  }
}
</script>
