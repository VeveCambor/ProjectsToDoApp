<template>
  <svg
    v-if="icon.icon"
    :fill="icon.color"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width + 'px'"
    :height="height + 'px'"
    :viewBox="iconFound.viewBox"
    xml:space="preserve">
    <g>
      <path :d="iconFound.path" />
      <path v-if="iconFound.paths" :d="iconFound.paths" />
    </g>
  </svg>
</template>
<script>
import { getIcon } from '@/icons/icons.js';


export default {
  name: 'VIcon',
  props: {
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 16
    },
    icon: { // { icon: '', color: '' }
      type: Object,
      required: true
    }
  },
  computed: {
    iconFound () {
      return this.icon.icon ? getIcon(this.icon.icon) : {}
    }
  }
}

</script>