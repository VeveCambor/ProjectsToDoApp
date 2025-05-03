<template>
  <div>
    <v-page
      title="Persons"
      addButtonLabel="add person"
      addButtonRedirect="/person-form"
      img="persons.png"
      :loading="loading"
    >
        <template v-slot:content>
          <v-accordeon
            v-for="person in personsToDisplay"
            :key="person.id"
            :title="person.fullName + ' (' + person.position + ')'"
          >
          <template v-slot:content>
            <div class="page-btn-container tasks-btn-container">
              <v-button label="detail" small-size @clicked="$router.push('/person/' + person.id)" />
              <v-button label="edit" small-size @clicked="$router.push('/person-form/' + person.id)" />
              <v-button v-if="!person.tasks.length" label="delete" small-size @clicked="onDeleteClicked(person)" />
            </div>
            <v-list :items="person.tasks" display-icons />
          </template>
        </v-accordeon>
        <!-- <t-button label="generate error" @click="errorBtn" /> -->
      </template>
    </v-page>
    <v-modal
      :show="showDeleteModal"
      title="confirm delete"
      ok-button-label="delete"
      cancel-button-label="cancel"
      @close-me="closeDeleteModal"
      @ok-clicked="deletePerson"
      @cancel-clicked="closeDeleteModal">
      <div>
        <span>Do you really want to delete </span>
        <strong>{{ personToDelete.fullName }}</strong>
        <span> ?</span>
      </div>
    </v-modal>
  </div>
</template>

<script>

import db from '../helpers/db.js'
import { formatDate, isPast } from '../helpers/dateFunctions.js'
import { sortingTasks } from '@/helpers/sorting.js'
import VButton from '../components/VButton.vue'
import VAccordeon from '../components/VAccordeon.vue'
import VList from '../components/VList.vue'
import VPage from '../components/VPage.vue'
import VModal from '../components/VModal.vue'

export default {

  name: 'PersonsPage',
  data () {
    return {
      loading: true,
      persons: [],
      tasks: [],
      personToDelete: {},
      showDeleteModal: false
    }
  },
  computed: {
    personsToDisplay () {
      return this.persons?.map(person => {
        return {
          id: person.id,
          fullName: person.last + ' ' + person.first,
          position: person.position,
          tasks: this.tasks
            ?.filter(task => person.id === task.personid)
            ?.map(task => {
              let icon = task.completed ? 'check' : isPast(task.date) ? 'warning' : 'clock'
              return {
                id: task.id,
                header: task.task,
                subtitle: task.project + ', ' + formatDate(task.date),
                icon,
                task: task.task,
                completed: task.completed,
                date: task.date
              }
            })
            ?.sort(sortingTasks) || []
        }
      })?.sort((a, b) => a.fullName.localeCompare(b.fullName)) || []
    }
  },
  async created () {
    console.log('PersonsPage created')
    try {
      console.log('Načítám osoby...')
      this.persons = await db.get('js4persons') || []
      console.log('Osoby načteny:', this.persons)
      
      console.log('Načítám úkoly osob...')
      this.tasks = await db.get('js4personstasks') || []
      console.log('Úkoly osob načteny:', this.tasks)
      
      this.loading = false
    } catch (error) {
      console.error('Chyba při načítání dat:', error)
      this.$store.commit('setError', true)
      this.$store.commit('setErrorMessage', 'Chyba při načítání dat.')
      this.loading = false
    }
  },
  methods: {
    onDeleteClicked (person) {
      this.personToDelete = person
      this.showDeleteModal = true
      console.log(this.personToDelete)
    },
    closeDeleteModal () {
      this.personToDelete = {}
      this.showDeleteModal = false
    },
    deletePerson () {
      db.delete('js4persons', { id: this.personToDelete.id } ).then(() => {
        this.closeDeleteModal()
        this.fetchData()
      })
    },
    // errorBtn () {
    //   const obj = null
    //   console.log(obj.property)
    // }
  },
  components: { VButton, VList, VAccordeon, VPage, VModal }
}
</script>