<template>
  <div class="accordeon">
    <div class="title" @click="onHeaderClicked" :class="{ 'content-shown': showContent }">
      <div class="title-label">{{  title  }}</div>
      <div class="title-arrow">
        <div class="arrow-down" :class="{ 'arrow-down-rotated': showContent }">&#60;</div>
      </div>
    </div>

    <transition name="roll-down">
      <div v-if="showContent" class="content">
        <slot name="content"></slot>
      </div>
    </transition>

  </div>
</template>

<script>

export default {
  name: 'TAccordeon',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showContent: false
    }
  },
  methods:{
    onHeaderClicked () {
      this.showContent = !this.showContent
    }
  }
}

</script>
<style lang="stylus" scoped>
@import '../styles/variables.styl'
@import '../styles/transitions.styl'
.accordeon
  max-width: 500px
  margin: 0 auto
.accordeon:not(:last-child)
  margin-bottom: 6px
.accordeon:first-child .title
  // border-radius: 10px 10px 0px 0px
  border-top-left-radius: 10px
  border-top-right-radius: 10px
.accordeon:last-child .title:not(.content-shown)
  // border-radius: 0 0 10px 10px
  border-bottom-left-radius: 10px
  border-bottom-right-radius: 10px
.title
  display: flex
  justify-content: space-between
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.2), 0px 3px 12px rgba(0, 0, 0, 0.1)
  cursor: pointer
  transition: color .3s ease
.title:hover
//background: lighten($secondary, 20)
  color: darken($tertiary, 20)

// .arrow-down
//   width: 0
//   height: 0
//   border-left: 10px solid transparent
//   border-right: 10px solid transparent
//   border-top: 15px solid $primary
//   transition: transform .3s ease

.arrow-down
  font-size: 1.4rem
  font-weight: bold
  transform: rotate(-90deg)
  transition: transform .3s ease

.arrow-down-rotated
  transform: rotate(90deg)
.title-label
  padding: $list-items-padding
  flex-grow: 1
  text-align: left
  font-weight: bold
  display: flex
  align-items: center
.title-arrow
  display: flex
  justify-content: center
  align-items: center
  padding: $list-items-padding
.content
  border-top: none
  border-radius: 10px
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.15)
  // padding: 10px 20px
</style>
