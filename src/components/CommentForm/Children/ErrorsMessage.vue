<template>
<div>
  <div v-if="errors.length">
    <div v-for="(error, i) in errors" :key="i">
      <div v-if="error.input === code" class="alert alert-danger">
        {{ error.message }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'CategoryList',
  props: {
    errors: {
      type: Array,
      required: false,
      default: []
    },
    code: {
      type: String,
      required: false,
      default: 'react'
    },
  }
}
</script>

<style scoped lang="scss">
.alert {
  padding: 5px;
  font-size: 0.9rem;
  margin-top: 5px;
  opacity: 0.8;


}
</style>
