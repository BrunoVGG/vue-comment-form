<template>
  <ul class="comment-list">
      <li v-for="(comment, i) in comments" :key="i">
        <div v-if="!comment.edit" class="comment-text">
            <p>{{ comment.title }}</p>
            <p>{{ comment.body }} </p>
            <span class="date sub-text">
              {{ comment.author }}
              on
              {{ $moment(comment.timestamp).format('MM/DD/YYYY hh:mm') }}
            </span>
        </div>
        <div v-if="comment.edit" class="comment-edit">
          <FormInput
            :comment-edit="comment"
            :id="comment.id"
            :current-category.sync="currentCategory"
            @load-comments="loadComments"
            @update-comment="updateCommentData"
          />
        </div>
        <div class="comment-action">
          <font-awesome-icon @click="$emit('open-edit', comment)" icon="edit"/>
          <font-awesome-icon @click="deleteComment(comment.id)" icon="trash"/>
        </div>
      </li>
  </ul>
</template>

<script>
import Vue from 'vue';
import { debug, debuglog } from 'util';
import FormInput from './FormInput';
import CommentList from './CommentList';

export default {
  name: 'CommentList',
  components: {
    FormInput
  },
  props: {
    comments: {
      type: Array,
      required: false,
      default: [],
    },
    currentCategory: {
      type: String,
      required: false,
      default: 'react'
    }
  },
  data() {
    return {
      items: [],
      showComentForm: false
    }
  },
  methods: {
    changeShowCommentForm() {
      this.showComentForm = !this.showComentForm;
    },
    deleteComment(id) {
      this.$emit('on-delete', id);
    },
    openEditComment(item, i) {
      let newStatus = !item.edit;
      item.edit = newStatus;
    },
    loadComments() {
      self.$emit('load-comments');
    },
    updateItem() {

      let self = this;
      let items = [];

      self.comments.forEach( item => {
        let newItem = {
          id: item.id,
          title: item.title,
          comment: item.comment,
          date: item.timestamp,
          edit: false
        }

        items.push(newItem);
      });

      self.items = items;
    },
    updateCommentData(comment) {
      let itemIndex = _.findIndex(this.comments, function(item) { return item.id == comment.id; });
      this.comments[itemIndex].edit = false;
      this.comments[itemIndex].title = comment.title;
      this.comments[itemIndex].body = comment.body;
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../Style/style.scss';

.comment-list {
  padding:0;
  list-style:none;

  li {
    text-align: left;
    margin:0;
    margin-top:10px;
    padding-top: 10px;
    border-top:1px dotted $gray-light;

    .comment-action {
      text-align: right;
      margin-top: 10px;

      svg {
        opacity: 0.7;
        margin-right: 20px;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    .btn-text {
      color: $gray-light;
    }

    .commenter-image {
      width:30px;
      margin-right:5px;
      height:100%;
      float:left;

      img {
        width:100%;
        border-radius:50%;
      }
    }

    .comment-text {
      p {
        margin:0;
        text-align: left;
      }

      .sub-text {
        color:#aaa;
        font-family:verdana;
        font-size:11px;
      }

    }
  }
}

</style>
