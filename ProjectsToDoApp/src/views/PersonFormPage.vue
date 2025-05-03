<template>
  <div>
    <v-page
      :title="title"
      :loading="loading"
      displayBackButton
    >
      <template v-slot:content>
        <v-form
          v-if="!loading"
          :settings="settings"
          @submited="onSubmited"
          @add-new="onAddNew" />
      </template>
    </v-page>
    <v-modal
      :show="showAddNewModal"
      title="add position"
      ok-button-label="submit"
      @close-me="closeAddNewModal"
      @cancel-clicked="closeAddNewModal"
      @ok-clicked="addPosition"
    >
      <div>
        <v-input
          control="addNewPosition"
          :settings="addNewPositionSettings"
          @changed="onAddNewPositionChanged"
        />
      </div>

    </v-modal>
  </div>
</template>

<script>

import db from '../helpers/db.js'
import VForm from '../components/form/VForm.vue'
import VPage from '../components/VPage.vue'
import VModal from '../components/VModal.vue'
import VInput from '../components/form/VInput.vue'
export default {
  name: 'PersonFormPage',
  data () {
    return {
      loading: true,
      settings: {
        first: {
          label: 'first name'
        },
        last: {
          label: 'last name'
        },
        positionid: {
          type: 'select',
          label: 'position',
          options: []
        }
      },
      showAddNewModal: false,
      addNewPositionSettings: {
        label: 'position',
        autofocus: true
      },
      addNewPositionValue: null
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add person' : 'Edit person'
    }
  },
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
    onSubmited (data) {
      const promise = this.mode === 'add'
        ? db.post('js4persons', data)
        : db.put('js4persons', Object.assign({ id: this.$route.params.id }, data ))
      promise.then(() => {
        this.$router.push('/persons')
      })
    },
    onAddNew (control) {
      if (control === 'positionid') {
        this.showAddNewModal = true
      }
    },
    closeAddNewModal () {
      this.showAddNewModal = false
    },
    addPosition () {
      db.post('js4positions', { position: this.addNewPositionValue }).then(() => {
        this.fetchPositions().then (() => {
          this.closeAddNewModal()
        })
      })
    },
    onAddNewPositionChanged (payload) {
      this.addNewPositionValue = payload.value
    }
  },
  components: { VForm, VPage, VModal, VInput }
}

</script>