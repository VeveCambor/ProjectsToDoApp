<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
  async created () {
    console.log('ProjectDetailPage created')
    try {
      console.log('Načítám projekt...')
      const projectId = this.$route.params.id
      this.project = await db.get(`js4projects/${projectId}`)
      console.log('Projekt načten:', this.project)
      
      console.log('Načítám úkoly...')
      this.tasks = await db.get('js4tasks') || []
      this.tasks = this.tasks.filter(task => task.projectid === projectId)
      console.log('Úkoly načteny:', this.tasks)
      
      this.loading = false
    } catch (error) {
      console.error('Chyba při načítání dat:', error)
      this.$store.commit('setError', true)
      this.$store.commit('setErrorMessage', 'Chyba při načítání dat.')
      this.loading = false
    }
  },
  data () {
    return {
      project: null,
      tasks: [],
      loading: true
    }
  }
}
</script>

<style>
  /* No changes to style section */
</style> 