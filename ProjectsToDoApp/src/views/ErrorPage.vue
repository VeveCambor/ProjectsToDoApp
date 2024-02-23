<template>
  <v-page
    title="error"
    :loading="false"
  >
    <template v-slot:content>
      <p>{{ errorMessage }}</p>

      <div class="back-button-container">
        <v-button label="home" @clicked="onBtnClicked" />
      </div>
    </template>

  </v-page>
</template>




<script>
import VPage from '@/components/VPage.vue'
import VButton from '@/components/VButton.vue'
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
  components: { VPage, VButton }
}

</script>