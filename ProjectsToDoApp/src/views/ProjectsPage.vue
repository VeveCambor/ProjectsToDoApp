<template>
  <div>
    <v-page
      title="Projects"
      addButtonLabel="add project"
      addButtonRedirect="/project-form"
      :loading="loading"
      img="projects.png"
    >
      <template v-slot:content>
        <p v-if="!projects.length">there are no projects in the database yet</p>
        <div v-else>
          <v-accordeon v-for="project in projectsToDisplay" :key="project.id"
            :title="project.project + ' (' + project.tasks.filter(task => task.completed).length + '/' + project.tasks.length + ')'">
            <template v-slot:content>
              <div class="page-btn-container">
                <v-button label="detail" small-size @clicked="$router.push('/project/' + project.id)" />
                <v-button label="edit" small-size @clicked="$router.push('/project-form/' + project.id)" />
                <v-button v-if="!project.tasks.length" label="delete" small-size @clicked="onDeleteClicked(project)" />
                <v-button label="add task" small-size @clicked="$router.push('/task-form-project/' + project.id)" />
              </div>
              <p v-if="!project.tasks.length" class="no-data-message">there are no tasks in the project</p>
              <v-list v-else :items="project.tasks" display-icons />
            </template>
          </v-accordeon>
        </div>
      </template>
    </v-page>
    <v-modal
      :show="showDeleteModal"
      title="confirm delete"
      ok-button-label="delete"
      cancel-button-label="cancel"
      @close-me="closeDeleteModal"
      @ok-clicked="deleteProject"
      @cancel-clicked="closeDeleteModal"
    >
      <div>
        <span>Do you really want to delete project </span>
        <strong>{{ projectToDelete.project }}</strong>
        <span> ?</span>
      </div>
    </v-modal>
  </div>
</template>

<script>
// import { getProjects, getTasks } from '../data/data.js'
import db from '../helpers/db.js'
import { formatDate, isPast } from '../helpers/dateFunctions.js'
import { sortingTasks  } from '@/helpers/sorting.js'
import VAccordeon from '../components/VAccordeon.vue'
import VList from '../components/VList.vue'
import VButton from '../components/VButton.vue'
import VPage from '../components/VPage.vue'
import VModal from '../components/VModal.vue'

export default {
  name: 'ProjectsPage',
  data () {
    return {
      projects: [],
      tasks: [],
      loading: true,
      showDeleteModal: false,
      projectToDelete: {}
    }
  },
  computed: {
    projectsToDisplay () {
      return this.projects.map(project => {
        return Object.assign(
          {
            tasks: this.tasks.filter(task => project.id === task.projectid).map(item => {
              let icon = ''
              if (item.completed) {
                icon = { icon: 'check', color: 'green' }
              } else if (isPast(item.date)) {
                icon = { icon: 'warning', color: 'red' }
              }
              return {
                id: item.id,
                header: item.task,
                subtitle: formatDate(item.date),
                icon,
                completed: item.completed,
                task: item.task,
                date: item.date
              }
            }).sort(sortingTasks)
          },
          project
        )
      }).sort((a, b) => a.project.localeCompare(b.project))
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    onDeleteClicked (project) { // { project: 'zahrada', id: 1, tasks: [] }
      this.projectToDelete = project
      this.showDeleteModal = true
    },
    deleteProject () {
      db.delete('js4projects', { id: this.projectToDelete.id }).then(() => {
        this.projectToDelete = {}
        this.showDeleteModal = false
        this.fetchData()
      })
    },
    closeDeleteModal () {
      this.projectToDelete = {}
      this.showDeleteModal = false
    },
    fetchData () {
      const promises = [
        db.get('js4projects').then(projects => {
          this.projects = projects
        }),
        db.get('js4tasks').then(tasks => {
          this.tasks = tasks
        })
      ]
      Promise.all(promises).then(() => {
        this.loading = false
      })
    }
  },
  components: { VAccordeon, VList, VButton, VPage, VModal,}
}

</script>
<style lang="stylus" scoped>
</style>
