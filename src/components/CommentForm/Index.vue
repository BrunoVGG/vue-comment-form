<template>
  <div class="App">
    <div class="detailBox">
      <div class="titleBox">
        <h1>
          <font-awesome-icon icon="comments"/>
        </h1>
      </div>
      <div> 
        <CategoryList :current-category.sync="currentCategory" :categories.sync="categories"/>
      </div>
      <div class="commentBox">
        <FormInput @load-comments="loadComments" :current-category.sync="currentCategory"/>
      </div>
      <div v-if="loading">
        <font-awesome-icon icon="spinner" class="fa-spin" />
      </div>  
      <div class="actionBox">
        <CommentList 
          :comments.sync="comments" 
          :current-category.sync="currentCategory" 
          @on-delete="deleteComment" 
          @open-edit="opendEdit"
          @load-comments="loadComments"
        />
      </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue';
import FormInput from './Children/FormInput';
import CategoryList from './Children/CategoryList';
import CommentList from './Children/CommentList';
import ErrorsMessage from './Children/ErrorsMessage';

export default {
  name: 'CommentForm',
  components: {
    FormInput,
    CategoryList,
    CommentList,
    ErrorsMessage
  },
  data () {
    return {
      comment: {
        title: '',
        message: ''
      },
      categories: [],
      comments: [],
      errors: [],
      loading: false
    }
  },
  created() {
    this.loadCategories();
    this.loadComments();
  },
  computed: {
    currentCategory() {
      return this.$route.params.category;
    }
  },
  watch: {
    currentCategory() {
      this.loadComments();
    }
  },
  methods: {
      loadCategories() {   
        let self = this;  
        self.loading = true;

        Vue.axios.get('categories')
        .then((response) => {
          self.loading = false;
          self.categories = response.data.categories;
        })
        .catch(errors => {
          this.errors = errors;
          self.loading = false;
        })
      },
      loadComments() {
        let self = this;
        self.loading = true;

        Vue.axios.get(`${self.currentCategory}/posts`)
        .then((response) => {
          self.loading = false;

          self.comments = [];
          
          response.data.forEach(item => {
            item.edit = false;
            self.comments.push(item);
          })

        })
        .catch(errors => {
          this.errors = errors;
          self.loading = false;
        })
      },
      deleteComment(id) {
        let self = this;
        self.loading = true;
        Vue.axios.delete(`posts/${id}`)
        .then(response => {
          self.loading = false;
          self.loadComments();
        })
        .catch( errors => {
          self.loading = false;
          self.errors = errors;
        });
      },
      opendEdit(comment){
        let itemIndex = _.findIndex(this.comments, function(item) { return item.id == comment.id; });
        this.comments[itemIndex].edit = !this.comments[itemIndex].edit;
      }
  }
}
</script>

<style scoped lang="scss">

  @import './Style/Style.scss';

  html {
    scroll-behavior: smooth;
  }

  .hidden {
    display: none
  }

  .detailBox {

    margin:10px;

    .alert {
      margin-top: 10px;
      font-size: 0.8em;
      opacity: 0.7;
      border-radius: 10px 10px 10px 10px;
    }

    .titleBox {
      padding:10px;
      
      h1{
        color: $green-vue;
        margin: 0;
        display: inline-block;
      }
    }

    .commentBox {
      padding:10px;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .actionBox {

      padding:10px;

    }
  }
</style>
