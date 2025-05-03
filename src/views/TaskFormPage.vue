<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
  created () {
    if (this.$route.params.projectid) {
      this.settings.projectid.initialValue = this.$route.params.projectid
      this.settings.projectid.disabled = true
    }
    const promises = [
      db.get('js4projects').then(projects => {
        if (!projects) {
          console.error('Nepodařilo se načíst projekty')
          this.settings.projectid.options = [{ value: '', label: '' }]
          return
        }
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
          if (!record) {
            console.error('Nepodařilo se načíst úkol')
            return
          }
          Object.keys(this.settings).forEach(control => {
            this.settings[control].initialValue = record[control]
          })
        })
      )
    }
    Promise.all(promises).then(() => { this.loading = false })
  },
  // ... existing code ...
}
</script>

<style>
  /* No changes to style section */
</style> 