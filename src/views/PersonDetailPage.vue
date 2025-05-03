<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
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
    }
  }
}
</script>

<style>
  /* No changes to style section */
</style> 