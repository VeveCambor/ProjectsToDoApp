<template>
  <form @submit="onSubmit">
    <t-modal
      :show="showErrorModal"
      title="error"
      :cancel-button-display="false"
      okButtonLabel="OK"
      @close-me="showErrorModal=false"
      @ok-clicked="showErrorModal=false"
    >
      <div>The form is not valid.</div>
    </t-modal>
    <div>
      <div v-for="control in controls" :key="control">
        <t-input
          :control="control"
          :settings="settings[control]"
          :error="formData[control].error"
          :error-message="formData[control].errorMessage"
          @changed="onChanged"
          @focused="onFocused"
          @blured="onBlured"
          @add-new="onAddNew"
        />
      </div>
    </div>
    <t-button class="submit-button" label="submit" btn-type="submit" />
  </form>
</template>

<script>

import validator from '../../helpers/validator.js'
import TInput from './TInput.vue'
import TButton from '../TButton.vue'
import TModal from '../TModal.vue'

export default {
  name: 'TForm',
  props: {
    settings: Object
  },
  data () {
    return {
      formData: {}, // formData.project: { value: '', error: false, errorMessage: '' }
      showErrorModal: false
    }
  },
  computed: {
    controls () {
      return Object.keys(this.settings)
    }
  },
  created () {
    this.controls.forEach(control => {
      this.formData[control] = {
        value: this.settings[control].initialValue || '',
        error: false,
        errorMessage: ''
      }
    })
  },
  methods: {
    onChanged (payload) {
      this.formData[payload.control].value = payload.value
    },
    onBlured (control) {
      this.validate(control)
    },
    onFocused (control) {
      this.formData[control].error = false
      this.formData[control].errorMessage = ''
    },
    validate (control) {
      let error = false
      if (this.settings[control].valRules) {
        this.settings[control].valRules.forEach((valRule) => { // { rule: 'required', par: 2, message: 'sdfsd' }
          if (!error) {
            const result = validator[valRule.rule](this.formData[control].value, valRule.par)
            if (!result) {
              error = true
              this.formData[control].error = true
              this.formData[control].errorMessage = valRule.message
            }
          }
        })
      }
      if (!error) {
        this.formData[control].error = false
        this.formData[control].errorMessage = ''
      }
    },
    onSubmit (e) {
      e.preventDefault()
      this.controls.forEach(control => {
        this.validate(control)
      })
      if (this.controls.every(control => !this.formData[control].error)) {
        // a) všechny kontrolky jsou validní
        // vyemitovat formData do rodičovské komponenty
        // { control: value, control2: value2 }
        const data = {}
        this.controls.forEach(control => {
          data[control] = this.formData[control].value
        })
        this.$emit('submited', data)
      } else {
        this.showErrorModal = true
      }
    },
    onAddNew (par) {
      this.$emit('add-new', par)
    }
  },
  components: { TInput, TButton, TModal }


}

</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'

form
  width: 60%
  max-width: 400px
  margin: 0 auto
  border-radius: $border-radius
  box-shadow: $box-shadow
  padding-bottom: 2rem

  .submit-button
    margin-top: $margin
</style>