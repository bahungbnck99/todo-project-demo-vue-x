import axios from "axios";

const postsModule = {
  state: {
    postEdit: {
      id: "",
      tittle: "",
      userId: "",
      body: ""
    },
    posts: []
  },
  getters: {
    posts: state => state.posts
  },
  actions: {
    async getPosts({ commit }) {
      const url = "https://jsonplaceholder.typicode.com/posts?_limit=4";
      axios
        .get(url)
        .then(res => {
          // console.log(res);
          commit("SET_POSTS", res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async addPost({ commit }, newPost) {
      const url = `https://jsonplaceholder.typicode.com/posts`;
      axios
        .post(url, newPost)
        .then(res => {
          console.log(res);
          if (res.status === 201) {
            // commit("DELETE_TODO", res.data);
            commit("ADD_POST", newPost);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    async deletePost(context, postId) {
      const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      axios
        .delete(url)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            // commit("DELETE_TODO", res.data);
            context.commit("DELETE_POST", postId);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    async editPost({ commit }, postId) {
      // commit("EDIT_POST", postId);
      // console.log(postId);
      const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      await axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            commit("EDIT_POST", res.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    async updatePost({ commit }, post) {
      console.log(post);
      //
      const url = `https://jsonplaceholder.typicode.com/posts/${post.id}`;

      axios
        .put(url,post)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            commit("UPDATE_POST", post);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    async ADD_POST(state, newPost) {
      state.posts.unshift(newPost);
    },
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    },
    EDIT_POST(state, postEdit) {
      state.postEdit = postEdit;
      console.log(postEdit);
      // console.log(postId);
      // state.posts.filter(post => {
      //   if (post.id === postId) {
      //     state.postEdit = post;

      //     // console.log(post);
      //   }
      // });
    },

    UPDATE_POST(state, postEdit) {
      state.posts.filter(post => {
        if (post.id === postEdit.id) {
          post.title = postEdit.title;
          console.log(post);
        }
        return post;
      });
    }
  }
};
export default postsModule;
