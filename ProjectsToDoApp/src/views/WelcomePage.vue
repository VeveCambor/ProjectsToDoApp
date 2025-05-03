<template>
  <v-page
    title="PROJECTS TO DO APP"
    :loading="loading"
  >
    <template v-slot:content>
      <div>
        <ul>
          <li>statistics</li>
          <li>
            <span>projects</span>
            <strong>{{ numberOfProjects }}</strong>
          </li>
          <li>
            <span>total tasks</span>
            <strong>{{ numberOfTasks }}</strong>
          </li>
          <li>
            <span>completed</span>
            <strong>{{ numberOfCompleted }}</strong>
          </li>
          <li>
            <span>uncompleted</span>
            <strong>{{ numberOfUncompleted }}</strong>
          </li>
          <li>
            <span>uncompleted over due</span>
            <strong>{{ numberOfOverDue }}</strong>
          </li>
          <li>
            <span>persons</span>
            <strong>{{ numberOfPersons }}</strong>
          </li>
        </ul>
      </div>
    </template>
  </v-page>

</template>

<script>
import db from '../helpers/db.js'
import { isPast } from '../helpers/dateFunctions.js'
import VPage from '@/components/VPage.vue'

export default {
  name: 'WelcomePage',
  data () {
    return {
      projects: [],
      tasks: [],
      persons: [],
      loading: true
    }
  },
  computed: {
    numberOfProjects () {
      return this.projects?.length || 0
    },
    numberOfTasks () {
      return this.tasks?.length || 0
    },
    numberOfCompleted () {
      return this.tasks?.filter(task => task.completed).length || 0
    },
    numberOfUncompleted () {
      return this.numberOfTasks - this.numberOfCompleted
    },
    numberOfOverDue () {
      return this.tasks?.reduce((acc, cur) => {
        return acc + (!cur.completed && isPast(cur.date) ? 1 : 0)
      }, 0) || 0
    },
    numberOfPersons () {
      return this.persons?.length || 0
    }
  },
  async created () {
    console.log('WelcomePage created')
    try {
      console.log('Načítám projekty...')
      this.projects = await db.get('js4projects') || []
      console.log('Projekty načteny:', this.projects)
      
      console.log('Načítám úkoly...')
      this.tasks = await db.get('js4tasks') || []
      console.log('Úkoly načteny:', this.tasks)
      
      console.log('Načítám osoby...')
      this.persons = await db.get('js4persons') || []
      console.log('Osoby načteny:', this.persons)
      
      this.loading = false
    } catch (error) {
      console.error('Chyba při načítání dat:', error)
      this.$store.commit('setError', true)
      this.$store.commit('setErrorMessage', 'Chyba při načítání dat.')
      this.loading = false
    }
  },
  components: { VPage }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
  
ul
  list-style-type: none
  margin: auto
  margin-top: 6rem
  padding: 0
  width: 100%
  max-width: 800px
  height: auto
  border-radius: $border-radius
  overflow: hidden
  box-shadow: $box-shadow
  & li
    padding: 1.2em 1.6em
    font-weight: bold
    &:not(:last-child)
      border-bottom: 1px solid #efefef
    &:first-child
      font-size: 1.3rem
      background: lighten($secondary, 60%)
    &:not(:first-child)
      display: flex
      justify-content: space-between    
</style>