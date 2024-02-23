<template>
  <nav class="nav">
    <template v-if="showHamburger">
      <!-- <t-hamburger v-if="showHamburger" @clicked="onHamburgerClicked"/> -->
      <button @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onHamburgerClicked">
        <v-icon :icon="{ icon: 'hamburger', color: color }" :width="24" :height="24" />
      </button>

      <transition name="roll-down">
        <ul v-if="showMenu" class="hamburger-ul">
          <li v-for="link in links" :key="link.label">
            <span v-if="$route.path === link.path">{{ link.label }}</span>
            <router-link v-else :to="link.path" @click="onClick">{{ link.label }}</router-link>
          </li>
        </ul>
      </transition>
    </template>
    <ul v-else>
      <li v-for="link in links" :key="link.label">
        <span v-if="$route.path === link.path">{{ link.label }}</span>
        <router-link v-else :to="link.path">{{ link.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>

// import THamburger from './THamburger.vue'
import VIcon from './VIcon.vue'

export default {

  name: 'VNavBar',
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showHamburger: false,
      showMenu: false,
      color: '#6fffe9'
    }
  },
  created () {
    this.showHamburger = window.innerWidth <= 800
    window.addEventListener('resize', () => {
      this.showHamburger = window.innerWidth <= 800
    })
  },
  methods: {
    onHamburgerClicked () {
      this.showMenu = !this.showMenu
    },
    onClick () {
      this.showMenu = false
    },
    onMouseEnter () {
      this.color = '#FF70AE'
    },
    onMouseLeave () {
      this.color = '#6fffe9'
    }
  },
  components: { VIcon }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

nav.nav
  background: $primary
  height: 60px
  align-items: center
  padding: 0 $margin
  font-size: 1.3rem
  display: flex
  position: relative
nav.nav > ul
  margin: 0
  list-style-type: none
  display: flex
  flex-direction: row
  justify-content: space-between
  flex-grow: 1
nav.nav > ul.hamburger-ul
  display: flex
  flex-direction: column
  background: $primary
  position: absolute
  z-index: 1
  padding: 0
  margin-top: 0.3rem
  top: 100%
  border-radius: $border-radius
  //border-bottom-left-radius: $border-radius
  //border-bottom-right-radius: $border-radius
  & li
    padding: 1rem 2rem
nav.nav a
  color: $secondary
  text-decoration: none
  cursor: pointer
  display: block
  transition: transform .5s ease
  &:hover
    transform: scale(1.2)
nav.nav > ul li span
  color: $tertiary

.roll-down-enter-from
  transform: scaleY(0)
.roll-down-enter-to
  transform: scaleY(1)
.roll-down-leave-from
  transform: scaleY(1)
.roll-down-leave-to
  transform: scaleY(0)
.roll-down-enter-active, .roll-down-leave-active
  transition: transform .4s linear
  transform-origin: top

nav > button
  background: transparent
  border: none
  cursor: pointer

</style>