<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
  async created () {
    console.log('PersonsPage created')
    try {
      console.log('Načítám osoby...')
      this.persons = await db.get('js4persons') || []
      console.log('Osoby načteny:', this.persons)
      
      console.log('Načítám úkoly osob...')
      this.tasks = await db.get('js4personstasks') || []
      console.log('Úkoly osob načteny:', this.tasks)
      
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