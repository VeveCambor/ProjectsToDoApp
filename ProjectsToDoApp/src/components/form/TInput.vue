<template>
  <div class="form-control">

    <label :for="control">{{ settings.label }}</label>

    <select
      v-if="settings.type === 'select'"
      :id="control"
      :autofocus="settings.autofocus || false"
      :autocomplete="settings.autocomplete || 'off'"
      :class="{ 'is-invalid': error }"
      :disabled="settings.disabled || false"
      :value="value"
      ref="myInput"
      @change="onChanged"
      @focus="onFocus"
      @blur="onBlur"
    >
      <option v-for="option in settings.options" :key="option.value" :value="option.value"
        :selected="'' + option.value === '' + settings.initialValue">{{ option.label }}
      </option>
    </select>

    <div class='radio' v-else-if="settings.type === 'radio'">
      <div v-for="option in settings.options" class='radio-option' :key="option.value" :value="option.value">
        <input
          :id="option.label"
          :value="option.value"
          :class="{ 'is-invalid': error }"
          :checked="value === option.value"
          type="radio"
          :name="control"
          @change="onChanged"
        />
        <label :for="option.label">{{ option.label }}</label>
      </div>
    </div>

    <input v-else :id="control" :autofocus="settings.autofocus || false" :autocomplete="settings.autocomplete || 'off'"
      :value="value" :class="{ 'is-invalid': error }" :type="settings.type || 'text'" ref="myInput" @input="onInput"
      @change="onChanged" @focus="onFocus" @blur="onBlur" />

    <transition name="slide-right">
      <div v-if="error" class="error-message">{{ errorMessage }}</div>
    </transition>

  </div>
</template>

<script>

export default {

  name: 'TInput',
  props: {
    control: String,
    settings: Object,
    error: Boolean,
    errorMessage: String
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.settings.initialValue === 0 ? 0 : this.settings.initialValue || ''
  },
  mounted () {
    if (this.settings.autofocus) {
      this.$refs.myInput.focus()
    }
  },
  methods: {
    onInput (e) {
      this.value = e.target.value
    },
    onChanged (e) {
      this.value = e.target.value
      if (this.value === 'addNew') {
        this.$emit('add-new', this.control)
        this.value = ''
        return
      }
      this.$emit('changed', { control: this.control, value: this.value })
      if (this.settings.type === 'radio') {
        this.$emit('blured', this.control)
      }
    },
    onFocus () {
      this.$emit('focused', this.control)
    },
    onBlur () {
      this.$emit('blured', this.control)
    },
  },
}

</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/transitions.styl'
.form-control
  display: flex
  flex-direction: column
  padding: 1rem
  position: relative
  & label
    text-align: left
    font-size: 1.2rem
    margin-bottom: .4rem
  & input, & select
    border-style: none
    outline: 1px solid #cdcdcd
    background: #efefef
    border-radius: $border-radius
    padding: .4em .8em
    font-size: 1.2rem
    transition: all .3s linear
    &.is-invalid
      background: lighten(red, 90%)
    &:focus
      outline: 2px solid #FF70AE
      background: #efefef
      border-radius: $border-radius
.error-message
  color: red
  text-align: left
  position: absolute
  top: calc(100% - .9rem)
  line-height: 1

.radio-option input:checked + label
  transition: background .3s ease
  background: lighten($secondary, 50%)
.radio input
  display: none
.radio
  display: flex
  justify-content: center
  & .radio-option
    outline: 1px solid #cdcdcd
    padding-top: 0.6rem
    padding-bottom: 0.6rem
    background: #efefef
  & .radio-option:first-child
    border-top-left-radius: 10px
    border-bottom-left-radius: 10px
  & .radio-option:last-child
    border-top-right-radius: 10px
    border-bottom-right-radius: 10px
.radio-option label
  padding: 0.6rem
.radio div:first-of-type label
  border-top-left-radius: 10px
  border-bottom-left-radius: 10px
.radio div:last-of-type label
  border-top-right-radius: 10px
  border-bottom-right-radius: 10px

</style>