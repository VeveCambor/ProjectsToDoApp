<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
  async created () {
    console.log('TasksPage created')
    try {
      console.log('Načítám úkoly...')
      this.tasks = await db.get('js4tasks') || []
      console.log('Úkoly načteny:', this.tasks)
      
      console.log('Načítám osoby...')
      this.persons = await db.get('js4personstasks') || []
      console.log('Osoby načteny:', this.persons)
      
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