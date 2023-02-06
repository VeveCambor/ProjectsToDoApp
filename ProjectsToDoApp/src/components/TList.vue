<template>
  <ul>
    <!-- items zobrazit v cyklu (tasks, persons, tasks .....) -->
    <li v-for="item in items" :key="item.id">
      <div class="icon" v-if="displayIcons">
        <t-icon
          v-if="item.icon"
          :icon="item.icon"
        />
      </div>
      <div class="content">
        <div class="header">{{  item.header }}</div>
        <div class="subtitle">{{ item.subtitle }}</div>
      </div>
      <div class="right">
        <t-button
          v-for="button in item.buttons" :key="button"
          :label="button"
          small-size
          @clicked="onClicked(item, button)"
        />
      </div>
    </li>
  </ul>
</template>
<script>
import TIcon from './TIcon.vue'
import TButton from './TButton.vue'

export default {
  name: 'TList',
  props: {
    items: Array, /*
    [
      {
        id: 23,
        header: 'tzsdutuf',
        subtitle: 'sdhjkfhsdk',
        icon: { icon: 'check', color: 'green' },
        buttons: [ label ]
      }
    ]
      */
    displayIcons: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClicked (item, button) { // {...}, 'mark done'
      this.$emit('clicked', { button, item })
    }
  },
  components: { TIcon, TButton }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

ul
  list-style-type: none
  margin: 0
  padding: 0
li
  padding: $list-items-padding
  text-align: left
  display: flex
  justify-content: flex-start
.content
  flex-grow: 1
.header
  font-weight: bold
.subtitle
  font-size: .8rem
.icon
  width: 1rem
  display: flex
  justify-content: center
  align-items: center
  margin-right: 1rem
.right
  display: flex
  align-items: center
  gap: $flex-gap
</style>