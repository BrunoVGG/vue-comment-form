<template>
<form @submit.prevent="sendComment">
  <div class="row">
    <div class="col-md-12 form-group">
      <input 
        v-model="comment.title" 
        type="text" 
        class="form-control"
        placeholder="Title"
      >
      <ErrorsMessage :errors="errors" code="title"/>
    </div>  
  </div>
  <div class="row">
    <div class="col-md-12 form-group">
      <textarea
        v-model="comment.body"
        class="form-control"
        placeholder="Comment"
      />
      <ErrorsMessage :errors="errors" code="body"/>
      <button 
        :class="this.comment.isNew ? 'btn-success' : 'btn-info'"
        class="btn-send-comment btn" type="submit">
        <span v-if="this.comment.isNew">
          Send
        </span>  
        <span v-else>
          Edit
        </span> 
      </button>
    </div>
  </div>
  <div v-if="loading">
    <font-awesome-icon icon="spinner" class="fa-spin" />
  </div>  
</form> 
</template>

<script>
import Vue from 'vue';
import ErrorsMessage from './ErrorsMessage';

export default {
  name: 'CommentForm',
  components: {
    ErrorsMessage
  },
  props: {
    currentCategory: {
      type: String,
      required: true  
    },
    commentEdit: {
      type: Object,
      required: false,
      default: this.comment
    }
  },
  data () {
    return {
      comment: {
        id: '',
        title: '',
        body: '',
        isNew: true
      },
      myUser: {
        name: 'Bruno Gomes',
        email: 'b.veigagg@gmail.com'
      },
      errors: [],
      loading: false
    }
  },
  mounted() {
    if (this.commentEdit) {
      this.comment.id = this.commentEdit.id;
      this.comment.title = this.commentEdit.title;
      this.comment.body = this.commentEdit.body;
      this.comment.isNew = false;
    }
  },
  methods: {
    newId() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    sendComment() {
      let self = this;
      self.errors = [];

      if (!self.comment.body) {
        self.errors.push({input:'body', message: 'Say something... =('});
      } 

      if (!self.comment.title) {
        self.errors.push({input:'title', message: 'What is the title?? :)'});
      } 

      if (!self.errors.length) {
        self.loading = true;
        this.comment.isNew ? this.newComment() : this.editComment();
      }
    
    },
    newComment() {
      let self = this;
      let newComment = {
        id: this.newId(),
        timestamp: Date.now(),
        title: self.comment.title,
        body: self.comment.body,
        author: self.myUser.name,
        category: self.currentCategory
      }

      Vue.axios.post('posts', newComment)
      .then(response => {
        self.loading = false;
        self.comment.title = '';
        self.comment.body = '';
        self.$emit('load-comments');
      })
      .catch( errors => {
        self.loading = false;
        self.errors = errors;
      });
    },
    editComment () {
      let self = this;
      
      let commment = {
        title: self.comment.title,
        body: self.comment.body
      }

      Vue.axios.put(`posts/${self.comment.id}`, commment)
      .then(response => {
        self.loading = false;
        self.$emit('update-comment', self.comment);
      })
      .catch( errors => {
        self.loading = false;
        self.errors = errors;
      });
    }
  }
}
</script>

<style scoped lang="scss">

  @import '../Style/Style.scss';

  form {

    text-align: left;
  
    textarea {
      border: 1px solid #bbb;
      border-radius: 10px 10px 0px 0px;
    }

    button {
      width: 100%;
      border-radius: 0px 0px 10px 10px;
    }

  }
</style>
