<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
  async created () {
    console.log('ProjectsPage created')
    try {
      console.log('Načítám projekty...')
      this.projects = await db.get('js4projects') || []
      console.log('Projekty načteny:', this.projects)
      
      this.loading = false
    } catch (error) {
      console.error('Chyba při načítání dat:', error)
      this.$store.commit('setError', true)
      this.$store.commit('setErrorMessage', 'Chyba při načítání dat.')
      this.loading = false
    }
  },
}
</script>

<style>
  /* No changes to style section */
</style> 