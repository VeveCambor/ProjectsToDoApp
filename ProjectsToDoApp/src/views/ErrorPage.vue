<template>
  <t-page
    title="error"
    :loading="false"
  >
    <template v-slot:content>
      <p>{{ errorMessage }}</p>

      <div class="back-button-container">
        <t-button label="home" @clicked="onBtnClicked" />
      </div>
    </template>

  </t-page>
</template>




<script>
import TPage from '@/components/TPage.vue'
import TButton from '@/components/TButton.vue'
export default {
  name: 'ErrorPage',
  computed: {
    errorMessage () {
      return this.$store.state.errorMessage
    }
  },
  methods: {
    onBtnClicked () {
      this.$store.commit('setError', false)
      this.$router.push('/')
    }
  },
  components: { TPage, TButton }
}

</script>