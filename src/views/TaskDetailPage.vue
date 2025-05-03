<template>
  <!-- No changes to template section -->
</template>

<script>
export default {
  // No changes to component options
  methods: {
    fetchPersons () {
      return db.get('js4personstasks?taskid=' + this.taskid).then(persons => {
        this.persons = persons
      })
    },
  }
}
</script>

<style>
  /* No changes to style section */
</style> 