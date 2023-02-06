<template>
  <t-page
    :title="title"
    :loading="loading"
    displayBackButton
  >
    <template v-slot:content>
      <t-form :settings="settings" v-if="!loading" @submited="onSubmited" />
    </template>
  </t-page>
</template>

<script>
import TForm from '../components/form/TForm.vue'
import TPage from '../components/TPage.vue'
import db from '../helpers/db.js'

export default {
  name: 'TaskFormPage',
  data () {
    return {
      loading: true,
      settings: {
        task: {
          label: 'task',
          valRules: [
            { rule: 'required', message: 'the task description is required' }
          ]
        },
        projectid: {
          label: 'project',
          type: 'select',
          valRules: [
            { rule: 'required', message: 'the project is required' }
          ],
        },
        date: {
          label: 'date to complete',
          type: 'date',
          valRules: [
            { rule: 'required', message: 'the date is required' }
          ]
        },
        completed: {
          label: 'completed',
          type: 'radio',
          options: [
            { value: 0, label: 'no' },
            { value: 1, label: 'yes' }
          ],
          valRules: [
            { rule: 'required', message: 'please mark the task as completed or not completed' }
          ]
        },
        priority: {
          label: 'priority',
          type: 'radio',
          options: [
            { value: 1, label: 'low' },
            { value: 2, label: 'medium' },
            { value: 3, label: 'high' }
          ],
          valRules: [
            { rule: 'required', message: 'the priority is required' }
          ]
        }
      }
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add task' : 'Edit task'
    }
  },
  created () {
    if (this.$route.params.projectid) {
      this.settings.projectid.initialValue = this.$route.params.projectid
      this.settings.projectid.disabled = true
    }
    const promises = [
      db.get('js4projects').then(projects => {
        this.settings.projectid.options = [{ value: '', label: '' }].concat(
          projects.map(project => {
            return { value: project.id, label: project.project }
          })
        )
      })
    ]
    if (this.mode === 'edit') {
      promises.push(
        db.get('js4tasks/' + this.$route.params.id).then(record => {
          Object.keys(this.settings).forEach(control => {
            this.settings[control].initialValue = record[control]
          })
        })
      )
    }
    Promise.all(promises).then(() => { this.loading = false })
  },
  methods: {
    onSubmited (data) {
      const promise = this.mode === 'add'
        ? db.post('js4tasks', data)
        : db.put('js4tasks', Object.assign({ id: this.$route.params.id }, data))
      promise.then(() => {
        this.$router.push('/tasks')
      })
    }
  },
  components: { TPage, TForm }
}

</script>