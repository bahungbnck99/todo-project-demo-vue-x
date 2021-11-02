<template>
  <div class="col-2  ">
    <div class="box box-post p-2 border position">
      <div class="image">
        <img src="./../assets/logo.png" class="w-100" alt="image" />
      </div>
      <p class="title-post">
        {{ post.title }}
      </p>
      <button
        @click="editPost(post.id)"
        class="btn btn-warning btn-sm position-absolute edit"
      >
        edit
      </button>
      <button
        @click="deletePost(post.id)"
        class="btn btn-danger btn-sm absolute delete"
      >
        delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ItemPost",
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  methods: {
    // deleteTodo(todoId) {
    //   this.$store.dispatch("deleteTodo", todoId);
    // }

    ...mapActions(["deletePost"]),
    async editPost(postId) {
      console.log(postId);
      await this.$store.dispatch("editPost", postId);
      this.$emit("increase", postId);
    }
  }
};
</script>

<style scoped>
.box-post {
  position: relative;
}
.delete {
  position: absolute;
  top: 4px;
  right: 4px;
}
button.edit {
  top: 8px;
  left: 8px;
}
.title-post {
  text-transform: capitalize;
  line-height: 1.125rem;
  height: 3.25rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.875rem;
}
</style>
