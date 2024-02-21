<template>
  <div>
    <t-page
      title="Persons"
      addButtonLabel="add person"
      addButtonRedirect="/person-form"
      img="persons.png"
      :loading="loading"
    >
        <template v-slot:content>
          <t-accordeon
            v-for="person in personsToDisplay"
            :key="person.id"
            :title="person.fullName + ' (' + person.position + ')'"
          >
          <template v-slot:content>
            <div class="page-btn-container tasks-btn-container">
              <t-button label="detail" small-size @clicked="$router.push('/person/' + person.id)" />
              <t-button label="edit" small-size @clicked="$router.push('/person-form/' + person.id)" />
              <t-button v-if="!person.tasks.length" label="delete" small-size @clicked="onDeleteClicked(person)" />
            </div>
            <t-list :items="person.tasks" display-icons />
          </template>
        </t-accordeon>
        <!-- <t-button label="generate error" @click="errorBtn" /> -->
      </template>
    </t-page>
    <t-modal
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
    </t-modal>
  </div>
</template>

<script>

import db from '../helpers/db.js'
import { formatDate, isPast } from '../helpers/dateFunctions.js'
import { sortingTasks } from '@/helpers/sorting.js'
import TButton from '../components/TButton.vue'
import TAccordeon from '../components/TAccordeon.vue'
import TList from '../components/TList.vue'
import TPage from '../components/TPage.vue'
import TModal from '../components/TModal.vue'

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
      return this.persons.map(person => {
        return {
          id: person.id,
          fullName: person.last + ' ' + person.first,
          position: person.position,
          tasks: this.tasks.filter(task => person.id === task.personid).map(task => {
            let icon = ''
            let color = ''
            if(task.completed) {
              icon = 'check'
              color = 'green'
            }
            else if (isPast(task.date)) {
              icon = 'warning'
              color = 'red'
            }
            return {
              id: task.id,
              header: task.task,
              subtitle: task.project + ', ' + formatDate(task.date),
              icon: { icon, color },
              task: task.task,
              completed: task.completed,
              date: task.date
            }
          }).sort(sortingTasks)
        }
      }).sort((a, b) => a.fullName.localeCompare(b.fullName))
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      Promise.all([
        db.get('js4persons').then((persons) => { this.persons = persons }),
        db.get('js4personstasks').then(tasks => { this.tasks = tasks })
      ]).then(() => {
        this.loading = false
      })
    },
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
  components: { TButton, TList, TAccordeon, TPage, TModal }
}
</script>