<template>
  <div>

    <h1>{{ title }}</h1>

    <img v-if="img" :src="getImgUrl(img)" :alt="title" />

    <div v-if="addButtonLabel" class="page-large-btn-container">
      <v-button :label="addButtonLabel" @clicked="$router.push(addButtonRedirect)" />
    </div>

    <v-loading v-if="loading" />

    <div v-else>
      <slot name="content"></slot>
      <div v-if="displayBackButton" class="back-button-container">
        <v-button label="back" class="btn-second" @click="$router.go(-1)" />
      </div>
    </div>

  </div>
</template>

<script>

import VLoading from './VLoading.vue'
import VButton from './VButton.vue'

export default {
  name: 'VPage',
  props: {
    title: String,
    addButtonLabel: String,
    addButtonRedirect: String,
    img: String,
    loading: Boolean,
    displayBackButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getImgUrl (pic) {
      return require('../assets/img/' + pic)
    }
  },
  components: { VLoading, VButton }
}


</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

h1
  font-size: $title-size
  margin: $margin 0
img
  margin-bottom: $margin
.page-large-btn-container
  padding-bottom: $margin
 
</style>