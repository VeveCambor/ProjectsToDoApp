<template>
  <button
    @click="onClick"
    :type="btnType"
  >{{ label }}</button>
</template>

<script>

export default {
  name: 'SButton',
  props: {
    smallSize: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    btnType: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    onClick () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
button
  background: none
  color: $primary
  padding: .7em 2em
  transition: all .3s ease
  border-radius: $border-radius
  border: 3px solid $primary
  font-size: 1.2rem
  cursor: pointer
  &:hover
    color: $tertiary
    background: $primary
    box-shadow: $btn-shadow

</style>