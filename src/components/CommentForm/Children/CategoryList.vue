<template>
<ul class="list-group list-group-horizontal row">
  <li 
    v-for="(category, i) in categories" 
    :key="i"
    @click="goTo(category.name)"
    :class="{active: currentCategory === category.name }"
    class="list-group-item list-group-item-darK col-xs-12 col-sm-12 col-md-4"
  >
    {{ category.name }}
  </li>
</ul>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'CategoryList',
  props: {
    currentCategory: {
      type: String,
      required: false,
      default: 'react'
    },
    categories: {
      type: Array,
      required: false,
      default: []
    }
  },
  methods: {
    goTo(category) {
      this.$router.push({name: 'commentByCategory', params: {category: category}});
    }
  }
}
</script>

<style scoped lang="scss">

  @import '../Style/style.scss';

.list-group {
  display: flex;
  .list-group-item {
    background-color: #51585f;

    /* TRANSITION */
    -webkit-transition: background 1s;
    -moz-transition: background 1s;
    -o-transition: background 1s;
    transition: background 1s;

    &.active {
      border: 1px solid #51585f;
      background-color: #3d4348;
    }

    &:hover {
      border: 1px solid #51585f;
      cursor: pointer;
      /* TRANSITION */
      -webkit-transition: background 1s;
      -moz-transition: background 1s;
      -o-transition: background 1s;
      transition: background 1s;
    }
  }
}
</style>
