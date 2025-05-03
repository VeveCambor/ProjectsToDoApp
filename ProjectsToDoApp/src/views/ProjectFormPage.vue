<template>
  <v-page
    :title="title"
    :loading="loading"
    displayBackButton
  >
    <template v-slot:content>
      <v-form :settings="settings" v-if="!loading" @submited="onSubmited" />
    </template>
  </v-page>
</template>

<script>
import VForm from '../components/form/VForm.vue'
import VPage from '../components/VPage.vue'
import db from '../helpers/db.js'
export default {
  name: 'ProjectFormPage',
  data () {
    return {
      settings: {
        project: {
          autofocus: true,
          label: 'project',
          valRules: [
            { rule: 'required', message: 'The project name is required.' },
            { rule: 'minLength', par: 3, message: 'The min length is 3 chars.' }
          ]
        }
      },
      loading: true
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add project' : 'Edit project'
    }
  },
  async created () {
    try {
      if (this.mode === 'add') {
        this.loading = false
        return
      }
      
      console.log('Načítám projekt pro editaci...')
      const record = await db.get('js4projects/' + this.$route.params.id)
      console.log('Projekt načten:', record)
      
      Object.keys(this.settings).forEach(control => {
        this.settings[control].initialValue = record[control]
      })

      this.loading = false
    } catch (error) {
      console.error('Chyba při načítání projektu:', error)
      this.$store.commit('setError', true)
      this.$store.commit('setErrorMessage', 'Chyba při načítání projektu.')
      this.loading = false
    }
  },
  methods: {
    async onSubmited (data) {
      try {
        console.log('Odesílám data projektu:', data)
        if (this.mode === 'add') {
          await db.post('js4projects', data)
          console.log('Projekt byl úspěšně přidán')
        } else {
          await db.put('js4projects', { ...data, id: this.$route.params.id })
          console.log('Projekt byl úspěšně upraven')
        }
        this.$router.push('/projects')
      } catch (error) {
        console.error('Chyba při ukládání projektu:', error)
        this.$store.commit('setError', true)
        this.$store.commit('setErrorMessage', 'Chyba při ukládání projektu.')
      }
    }
  },
  components: { VForm, VPage }
}

</script>