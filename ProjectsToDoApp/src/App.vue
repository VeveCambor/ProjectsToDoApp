<template>
  <div>
    <t-nav-bar :links="navbarLinks" />
    <error-page v-if="error" />
    <div v-else>
      <!-- <transition name="fadeout"> -->
        <router-view />
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import TNavBar from './components/TNavBar.vue'
import ErrorPage from './views/ErrorPage.vue'

export default {
  name: 'App',
  data () {
    return {
      navbarLinks: [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
        { path: '/tasks', label: 'Tasks' },
        { path: '/persons', label: 'Persons' }
      ]
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    }
  },
  mounted () {
    window.addEventListener('error', () => {
      this.$store.commit('setErrorMessage', 'jejda, něco se pokazilo')
      this.$store.commit('setError', true)
    })
  },
  components: { TNavBar, ErrorPage }
}

</script>


<style lang="stylus">
@import './styles/variables.styl'

body, html
  margin: 0
  padding: 0

body
  padding-bottom: 2rem

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  text-align center
  color #2c3e50

.page-btn-container
  display: flex
  justify-content: flex-end
  align-items: center
  padding: $list-items-padding
  border-bottom: 1px solid #efefef
  gap: $flex-gap

.back-button-container
  margin: $margin 0

.no-data-message
  padding-bottom: 1rem

// .fadeout-enter-from, .fadeout-leave-to
//   opacity: 0
// .fadeout-enter-to, .fadeout-leave-from
//   opacity: 1
// .fadeout-enter-active, .fadeout-leave-active
//   transition: opacity .2s ease
</style>
