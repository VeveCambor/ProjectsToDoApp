<template>
  <button
    @click="onClick"
    :class="{ 'btn-small': smallSize, 'btn-second': secondVariant}"
    :type="btnType"
  >{{ label }}</button>
</template>

<script>

export default {
  name: 'VButton',
  props: {
    smallSize: {
      type: Boolean,
      default: false
    },
    secondVariant: {
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
  background: $primary
  color: $secondary
  padding: .6em 2em
  transition: all .3s ease
  border-radius: $border-radius
  font-size: 1.2rem
  border: none
  cursor: pointer
  &:hover
    color: $tertiary
    box-shadow: $btn-shadow

.btn-small
  font-size: 1rem
  background: lighten($secondary, 20)
  color: $primary
  &:hover
    color: darken($tertiary, 20)
    box-shadow: $btn-shadow

.btn-second
  background: none
  color: $primary
  padding: .7em 2em
  transition: all .3s ease
  border-radius: $border-radius
  border: 3px solid $primary
  font-size: 1.2rem
  cursor: pointer
  &:hover
    color: darken($tertiary, 20)
    border: 3px solid darken($tertiary, 20)
    //background: $primary
    box-shadow: $btn-shadow
</style>