<template>
  <!-- No changes to template section -->
</template>

<script>
import db from '../services/db'

export default {
  created () {
    const promises = [ this.fetchPositions() ]
    if (this.mode === 'edit') {
      promises.push(
        db.get('js4persons/' + this.$route.params.id).then(record => {
          Object.keys(this.settings).forEach(control => {
            this.settings[control].initialValue = record[control]
          })
        })
      )
    }
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  methods: {
    fetchPositions () {
      return db.get('js4positions').then((positions) => {
        if (!positions) {
          console.error('Nepodařilo se načíst pozice')
          this.settings.positionid.options = [{ value: '', label: '' }]
          return
        }
        this.settings.positionid.options = positions.map(position => {
          return {
            value: position.id,
            label: position.position
          }
        })
        this.settings.positionid.options.unshift({ value: '', label: '' })
        this.settings.positionid.options.push({ value: 'addNew', label: 'add new' })
      })
    },
  }
}
</script>

<style>
  /* No changes to style section */
</style> 