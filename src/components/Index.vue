<template>
  <div class="hello">
      <div class="container bg-faded">
          <div class="row">
              <div class="col">
                  <div class="mx-auto w-50 p-3 bg-dark text-white text-center">
                      <span><CommentForm :comments.sync="comments"/></span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import CommentForm from './CommentForm/CommentForm';

export default {
  name: 'HelloWorld',
  components: {
    CommentForm
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      comments: []
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
