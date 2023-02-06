<template>
  <t-page
    title="Tasks"
    addButtonLabel="add task"
    addButtonRedirect="/task-form"
    :loading="loading"
    img="tasks.png"
  >
    <template v-slot:content>
      <t-accordeon
        v-for="task in tasksToDisplay"
        :key="task.id"
        :title="task.task + ' (' + task.project + ')'"
      >
        <template v-slot:content>
          <div class="task-info-row">
            <div class="task-icon">
              <t-icon :icon="task.icon" />
            </div>
            <div class="task-date">
              {{ formatDate(task.date) }}
            </div>
            <div class="page-btn-container tasks-btn-container">
              <t-button label="detail" small-size @clicked="$router.push('/task/' + task.id)" />
              <t-button label="edit" small-size @clicked="$router.push('/task-form/' + task.id)" />
              <t-button v-if="!task.persons.length" label="delete" small-size @clicked="onDeleteClicked(task)" />
            </div>
          </div>
          <t-list :items="task.persons" />
        </template>
      </t-accordeon>
    </template>
  </t-page>
  <t-modal :show="showDeleteModal" title="confirm delete" ok-button-label="delete" cancel-button-label="cancel"
    @close-me="closeDeleteModal" @ok-clicked="deleteTask" @cancel-clicked="closeDeleteModal">
    <div>
      <span>Do you really want to delete task </span>
      <strong>{{ taskToDelete.task }}</strong>
      <span> ?</span>
    </div>
  </t-modal>
</template>

<script>

import db from '../helpers/db.js'
import { isPast, formatDate } from '../helpers/dateFunctions.js'
import { sortingTasks } from '@/helpers/sorting.js'
import TAccordeon from '../components/TAccordeon.vue'
import TButton from '../components/TButton.vue'
import TList from '../components/TList.vue'
import TPage from '../components/TPage.vue'
import TIcon from '../components/TIcon.vue'
import TModal from '../components/TModal.vue'

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
  components: { TAccordeon, TButton, TList, TPage, TIcon, TModal }
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