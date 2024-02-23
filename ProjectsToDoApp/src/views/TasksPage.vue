<template>
  <div>
    <v-page
      title="Tasks"
      addButtonLabel="add task"
      addButtonRedirect="/task-form"
      :loading="loading"
      img="tasks.png"
    >
      <template v-slot:content>
        <v-accordeon
          v-for="task in tasksToDisplay"
          :key="task.id"
          :title="task.task + ' (' + task.project + ')'"
        >
          <template v-slot:content>
            <div class="task-info-row">
              <div class="task-icon">
                <v-icon :icon="task.icon" />
              </div>
              <div class="task-date">
                {{ formatDate(task.date) }}
              </div>
              <div class="page-btn-container tasks-btn-container">
                <v-button label="detail" small-size @clicked="$router.push('/task/' + task.id)" />
                <v-button label="edit" small-size @clicked="$router.push('/task-form/' + task.id)" />
                <v-button v-if="!task.persons.length" label="delete" small-size @clicked="onDeleteClicked(task)" />
              </div>
            </div>
            <v-list :items="task.persons" />
          </template>
        </v-accordeon>
      </template>
    </v-page>
    <v-modal :show="showDeleteModal" title="confirm delete" ok-button-label="delete" cancel-button-label="cancel"
      @close-me="closeDeleteModal" @ok-clicked="deleteTask" @cancel-clicked="closeDeleteModal">
      <div>
        <span>Do you really want to delete task </span>
        <strong>{{ taskToDelete.task }}</strong>
        <span> ?</span>
      </div>
    </v-modal>
  </div>
</template>

<script>

import db from '../helpers/db.js'
import { isPast, formatDate } from '../helpers/dateFunctions.js'
import { sortingTasks } from '@/helpers/sorting.js'
import VAccordeon from '../components/VAccordeon.vue'
import VButton from '../components/VButton.vue'
import VList from '../components/VList.vue'
import VPage from '../components/VPage.vue'
import VIcon from '../components/VIcon.vue'
import VModal from '../components/VModal.vue'

export default {
  name: 'TasksPage',
  data () {
    return {
      loading: true,
      tasks: [],
      persons: [],
      showDeleteModal: false,
      taskToDelete: {}
    }
  },
  computed: {
    tasksToDisplay () {
      return this.tasks.map(task => {
        let icon = ''
        let color = ''
        if (task.completed) {
          icon = 'check'
          color= 'green'
        } else if (isPast(task.date)) {
          icon = 'warning'
          color = 'red'
        }
        const persons = this.persons
          .filter(person => task.id === person.taskid)
          .map(person => {
            return {
              id: person.id,
              header: person.last + ' ' + person.first,
              subtitle: person.position
            }
          })
          .sort((a, b) => a.header.localeCompare(b.header))
        return Object.assign(task, { icon: { icon, color } }, { persons })
      }).sort(sortingTasks)
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const promises = [
        db.get('js4tasks').then(tasks => { this.tasks = tasks }),
        db.get('js4personstasks').then(persons => { this.persons = persons })
      ]
      Promise.all(promises).then(() => { this.loading = false })
    },
    onDeleteClicked (task) {
      this.taskToDelete = task
      this.showDeleteModal = true
    },
    closeDeleteModal () {
      this.taskToDelete = {}
      this.showDeleteModal = false
    },
    deleteTask () {
      db.delete('js4tasks', { id: this.taskToDelete.id }).then(() => {
        this.taskToDelete = {}
        this.showDeleteModal = false
        this.fetchData()
      })
    },
    formatDate (date) {
      return formatDate(date)
    }
  },
  components: { VAccordeon, VButton, VList, VPage, VIcon, VModal }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.task-info-row
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid #efefef
.task-icon
  padding: $list-items-padding

.page-btn-container.tasks-btn-container
  border-bottom: none

</style>