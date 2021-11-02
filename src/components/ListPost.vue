<template>
  <div class="list-post">
    <h1>ListPost</h1>
    <div class="card">
      <div class="card-header text-right d-flex justify-content-between">
        <div>
          <b-button v-b-modal.modal-prevent-closing>Thêm bài viết</b-button>

          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Thông tin bài viết"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                label="Nhập vào tiêu đề bài viết"
                label-for="name-input"
                invalid-feedback="Tiêu đề chưa được nhập"
                :state="nameState"
              >
                <b-form-input
                  id="name-input"
                  v-model="title"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <ItemPost
            @increase="handleEvent"
            v-for="post in posts"
            :key="post.id"
            v-bind:post="post"
          ></ItemPost>
          <!-- <div
            class="col-2 m-2 box-post p-2 border position"
            v-for="post in posts"
            :key="post.id"
          >
            <div class="image">
              <img src="./../assets/logo.png" class="w-100" alt="image" />
            </div>
            <p v-text="post.title">
            </p>
            <button
              @click="deletePost(index)"
              class="btn btn-danger btn-sm absolute delete"
            >
              delete
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemPost from "./ItemPost.vue";
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ListPost",
  data() {
    return {
      post: {
        id: "",
        title: "",
        body: "",
        userId: ""
      },
      title: "",
      nameState: null,
      submittedNames: []
    };
  },
  components: {
    ItemPost
  },
  computed: mapGetters(["posts"]),
  created() {
    this.getPosts();
  },

  methods: {
    ...mapActions(["getPosts", "addPost", "updatePost"]),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      console.log(this.id);
      if (this.post.id) {
        this.post.title = this.title;
        this.post.body = this.title;
        this.post.userId = 1;
        this.updatePost(this.post);
      } else {
        this.addPost({
          id: uuidv4(),
          title: this.title,
          body: this.title,
          userId: 1
        });
      }

      // console.log(this.id);
      // console.log(this.title);
      // Push the name to submitted names
      if (this) this.submittedNames.push(this.name);
      this.title = "";
      this.id = "";
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    async handleEvent(postId) {
      // await this.$store.dispatch("editPost", postEdit);
      let postEdit = this.$store.state.posts.postEdit;
      this.title = postEdit.title;
      this.post.id = postEdit.id;
      this.$bvModal.show("modal-prevent-closing");
      // console.log(this.id);
    }
  }
};
</script>

<style scoped></style>
