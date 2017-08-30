<template>
  <x-header :left-options="{backText: ''}" style="position:fixed;left: 0px; top: 0px;z-index: 1001; width:100%;">
    <slot></slot>
  </x-header>
</template>

<script>
  export default {
    name: 'my-header',
    data() {
      return {
      }
    },
    created() {
    },
    props: {
    }
  }

</script>

<style>
</style>