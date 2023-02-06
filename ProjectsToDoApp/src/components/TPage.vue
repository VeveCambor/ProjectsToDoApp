<template>
  <div>

    <h1>{{ title }}</h1>

    <img v-if="img" :src="getImgUrl(img)" :alt="title" />

    <div v-if="addButtonLabel" class="page-large-btn-container">
      <t-button :label="addButtonLabel" @clicked="$router.push(addButtonRedirect)" />
    </div>

    <t-loading v-if="loading" />

    <div v-else>
      <slot name="content"></slot>
      <div v-if="displayBackButton" class="back-button-container">
        <t-button label="back" @click="$router.go(-1)" />
      </div>
    </div>

  </div>
</template>

<script>

import TLoading from './TLoading.vue'
import TButton from './TButton.vue'

export default {
  name: 'TPage',
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
  components: { TLoading, TButton }
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