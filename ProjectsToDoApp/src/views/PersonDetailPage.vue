<template>
  <div>
    <v-page
      :loading="loading"
      :title="person ? person.last + ' ' + person.first + ' (' + person.position + ')' : ''"
    >
      <template v-slot:content>
        <div class="detail-wrap">
          <div class="detail-container">
            <div>
              <v-list
                :items="tasksToDisplay"
                display-icons
                @clicked="onItemButtonClicked"
              />
            </div>
            <div class="top-buttons">
              <v-button label="edit" class="btn-second" @clicked="onEditButtonClicked" />
              <v-button label="add task" @clicked="onAddTaskClicked" />
              <v-button v-if="!tasks.length" label="delete" @clicked="onDeleteButtonClicked" />
            </div>
          </div>
        </div>
      </template>
    </v-page>
    <v-modal
      :show="showDeleteModal"
      title="confirm delete"
      ok-button-label="delete"
      @close-me="closeDeleteModal"
      @ok-clicked="deletePerson"
      @cancel-clicked="closeDeleteModal"
    >
      <div>
        <span>do you really want to delete </span>
        <strong>{{ person.last + ' ' + person.first }}</strong>
        <span> ?</span>
      </div>
    </v-modal>
    <v-modal
      :show="showAddTaskModal"
      title="add task"
      ok-button-label="submit"
      @close-me="closeAddTaskModal"
      @cancel-clicked="closeAddTaskModal"
      @ok-clicked="addTask">
      <div>
        <v-input
          control="addTask"
          :settings="addTaskSettings"
          @changed="onAddTaskChanged" />
      </div>
    </v-modal>
  </div>
</template>

<script>
import db from '@/helpers/db.js'
import { isPast, formatDate } from '@/helpers/dateFunctions.js'
import { sortingTasks } from '@/helpers/sorting.js'
import VPage from '@/components/VPage.vue'
import VButton from '@/components/VButton.vue'
import VModal from '@/components/VModal.vue'
import VList from '@/components/VList.vue'
import VInput from '@/components/form/VInput.vue'

export default {
  name: 'PersonDetailPage',
  data () {
    return {
      person: null,
      loading: true,
      tasks: null,
      showDeleteModal: false,
      showAddTaskModal: false,
      addTaskSettings: {
        type: 'select',
        options: []
      },
      taskidToAdd: null
    }
  },
  computed: {
    personid () {
      return this.$route.params.id
    },
    tasksToDisplay () {
      return this.tasks
        .slice()
        .sort(sortingTasks)
        .map(task => {
          let icon = ''
          let color = ''
          const buttons = [task.completed ? 'undone' : 'done', 'remove', 'edit']
          if (task.completed) {
            icon = 'check',
            color = 'green'
          } else if (isPast(task.date)) {
            icon = 'warning',
            color = 'red'
          }
          return {
            id: task.taskid,
            header: task.task,
            subtitle: formatDate(task.date),
            icon: { icon, color },
            buttons
          }
        })
    }
  },
  created () {
    const promises = [
      db.get('js4persons/' + this.personid).then(record => {
        this.person = record
      }),
      this.fetchTasks()
    ]
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  methods: {
    fetchTasks () {
      return db.get('js4personstasks?personid=' + this.personid).then((tasks) => {
        this.tasks = tasks
      })
    },
    onEditButtonClicked () {
      this.$router.push('/person-form/' + this.personid)
    },
    onDeleteButtonClicked () {
      this.showDeleteModal = true
    },
    closeDeleteModal () {
      this.showDeleteModal = false
    },
    deletePerson () {
      db.delete('js4persons', { id: this.personid }).then(() => {
        this.closeDeleteModal()
        this.$router.push('/persons')
      })
    },
    onItemButtonClicked (payload) {
      if (payload.button === 'edit') {
        this.$router.push('/task-form/' + payload.item.id)
      } else if (payload.button === 'remove') {
        const obj = this.tasks.find((item) => {
          return ('' + item.personid === '' + this.personid) && ('' + item.taskid === '' + payload.item.id)
        })
        db.delete('js4personstasks', { id: obj.id }).then(() => {
          this.fetchTasks()
        })
      } else {
        const completed = payload.button === 'done' ? 1 : 0
        db.put('js4tasks', { id: payload.item.id, completed }).then(() => {
          db.get('js4tasks/' + payload.item.id).then((record) => {
            this.tasks.find(task => task.taskid === payload.item.id).completed = record.completed
          })
        })
      }
    },
    onAddTaskClicked () {
      db.get('js4tasks').then((allTasks) => {
        const tasksFiltered = allTasks.filter(taskFromAll => {
          return !this.tasks.some(item => {
            return '' + item.taskid === '' + taskFromAll.id
          })
        })
        this.addTaskSettings.options = tasksFiltered.map(task => {
          return {
            value: task.id,
            label: task.task + ' (' + task.project + ')'
          }
        })
        this.addTaskSettings.options.unshift({ value: '', label: '' })
      }).then(() => {
        this.taskidToAdd = null
        this.showAddTaskModal = true
      })
    },
    closeAddTaskModal () {
      this.showAddTaskModal = false
    },
    onAddTaskChanged (payload) {
      this.taskidToAdd = payload.value
    },
    addTask () {
      db.post('js4personstasks', { personid: this.personid, taskid: this.taskidToAdd }).then(() => {
        this.fetchTasks().then(() => {
          this.closeAddTaskModal()
        })
      })
    }
  },
  components: { VPage, VButton, VModal, VList, VInput }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.top-buttons
  display: flex
  gap: 1rem
  justify-content: center
  margin-bottom: $margin

.detail-wrap
  width: 100vw  
  width 100%
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  gap: $margin
.detail-container
    width: 95%
    height: auto
    display: flex
    flex-direction: column
    gap: $margin
    border-radius: $border-radius
    box-shadow: $box-shadow
</style>