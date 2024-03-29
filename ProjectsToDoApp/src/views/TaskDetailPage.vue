<template>
  <div>
    <v-page
      :loading="loading"
      :title="task ? task.task : ''"
    >
      <template v-slot:content>
        <div class="detail-wrap">
          <div class="detail-container">
            <div>
              <v-list
                :items="personsToDisplay"
                @clicked="onItemButtonClicked"
              />
            </div>
            <div class="top-buttons">
              <v-button label="edit" class="btn-second" @clicked="onEditButtonClicked" />
              <v-button v-if="!persons.length" label="delete" @clicked="onDeleteButtonClicked" />
              <v-button label="add person" @clicked="onAddPersonClicked" />
            </div>
          </div>
        </div>
      </template>
    </v-page>
    <v-modal
      :show="showDeleteModal"
      title="confirm delete"
      ok-button-label="delete"
      @close-me="closeDeleteModal"
      @ok-clicked="deleteTask"
      @cancel-clicked="closeDeleteModal">
      <div>
        <span>do you really want to delete </span>
        <strong>{{ person.last + ' ' + person.first }}</strong>
        <span> ?</span>
      </div>
    </v-modal>
    <v-modal
      :show="showAddPersonModal"
      title="add person"
      ok-button-label="submit"
      @close-me="closeAddPersonModal"
      @cancel-clicked="closeAddPersonModal"
      @ok-clicked="addPerson"
    >
      <div>
        <v-input
          control="addPerson"
          :settings="addPersonSettings"
          @changed="onAddPersonChanged"
        />
      </div>
    </v-modal>
  </div>
</template>

<script>

import db from '../helpers/db.js'
import VPage from '../components/VPage.vue'
import VButton from '../components/VButton.vue'
import VModal from '../components/VModal.vue'
import VList from '../components/VList.vue'
import VInput from '../components/form/VInput.vue'

export default {

  name: 'TaskDetailPage',
  data () {
    return {
      task: null, // Object
      persons: null, // Array
      loading: true,
      showDeleteModal: false,
      showAddPersonModal: false,
      addPersonSettings: {
        type: 'select',
        options: [
  //        { value: ..., label: ...}
        ]
      },
      personToAdd: null
    }
  },
  computed: {
    taskid () {
      return this.$route.params.id
    },
    personsToDisplay () {
      return this.persons.map(person => {
        return {
          id: person.personid,
          header: person.last + ' ' + person.first,
          subtitle: person.position,
          icon: { icon: '', color: ''},
          buttons: ['remove', 'edit']
        }
      }).sort((a, b) => a.header.localeCompare(b.header))
    }
  },
  created () {
    Promise.all([
      db.get('js4tasks/' + this.taskid).then(task => {
        this.task = task
      }),
      this.fetchPersons()
    ]).then(() => {
      this.loading = false
    })
  },
  methods: {
    fetchPersons () {
      return db.get('js4personstasks?taskid=' + this.taskid).then(persons => {
        this.persons = persons
      })
      /*
        [
          { id: 1, taskid: 2, personid: 5, task: 'natřít plot', first: 'Karel', last: 'Houska', ...},
          { id: 2, taskid: 2, personid: 3}
        ]
      */
    },
    onEditButtonClicked () {
      this.$router.push('/task-form/' + this.taskid)
    },
    onDeleteButtonClicked () {
      this.showDeleteModal = true
    },
    closeDeleteModal () {
      this.showDeleteModal = false
    },
    deleteTask () {
      db.delete('js4tasks', { id: this.taskid }).then(() => {
        this.closeDeleteModal()
        this.$router.push('/tasks')
      })
    },
    onItemButtonClicked (payload) {
      if (payload.button === 'edit') {
        this.$router.push('/person-form/' + payload.item.id)
        return
      }
      if (payload.button === 'remove') {
        const obj = this.persons.find((item) => {
          return ('' + item.taskid === '' + this.taskid) && ('' + item.personid === '' + payload.item.id)
        })
        db.delete('js4personstasks', { id: obj.id }).then(() => {
          this.fetchPersons()
        })
      }
    },
    onAddPersonClicked () {
      // načíst z databáze všechny persons
      // vyfiltrovat to načtené pole na persons, které ještě nejsou našemu úkolu přiřazeny
      // namapovat vyfiltrované pole na formát { value: personid, label: popisek = last + first + (position) }
      // this.persons = [ {personid: 'jablko', last: '', first: '' }, §hruška, 'švestka']
      db.get('js4persons').then((allPersons) => {
        // porovnávat budeme podle personid
        // první na porovnání - načtená tabulka persons .... a tam mám hodnotu person.id
        // druhá na porovnávání -
        const personsFiltered = allPersons.filter(personFromAll => {
          return !this.persons.some(item => {
            return '' + item.personid === '' + personFromAll.id
          })
        })
        this.addPersonSettings.options = personsFiltered.map(person => {
          return {
            value: person.id,
            label: person.last + ' ' + person.first + ' (' + person.position + ')'
          }
        })
        this.addPersonSettings.options.unshift({ value: '', label: '' })
      }).then(() => {
        this.personToAdd = null
        this.showAddPersonModal = true
      })
    },
    closeAddPersonModal () {
      this.showAddPersonModal = false
    },
    addPerson () {
      db.post('js4personstasks', { taskid: this.taskid, personid: this.personToAdd }).then(() => {
        this.fetchPersons().then(() => {
          this.closeAddPersonModal()
        })
      })
    },
    onAddPersonChanged (payload) {
      this.personToAdd = payload.value
    }
  },
  components: { VPage, VButton, VModal, VList, VInput }
}

</script>
<style lang="stylus" scoped>
@import '../styles/variables.styl'
.top-buttons
  display: flex
  gap: 1rem
  justify-content: center
  margin-bottom: $margin
.detail-wrap
  width: 100vw  
  width 100%
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  gap: $margin
.detail-container
    width: 95%
    height: auto
    display: flex
    flex-direction: column
    gap: $margin
    border-radius: $border-radius
    box-shadow: $box-shadow
</style>