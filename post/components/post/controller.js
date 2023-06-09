const nanoid = require("nanoid");
const error = require("../../../utils/error");

const COLLECTION = "post";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list(query) {
    return store.list(COLLECTION);
  }

  async function get(id) {
    const post = await store.get(COLLECTION, id);
    if (!post) {
      throw error("No existe el post", 404);
    }
    return post;
  }

  async function upsert(data, user) {
    const post = {
      id: data.id,
      user: user,
      text: data.text,
    };

    if (!post.id) {
      post.id = nanoid();
    }
    return store.upsert(COLLECTION, post).then(() => post);
  }

  async function like(post, user) {
    const like = await store.upsert(COLLECTION + "_like", {
      post: post,
      user: user,
    });
    return like;
  }

  async function postsLiked(user) {
    const users = await store.query(
      COLLECTION + "_like",
      { user: user },
      { post: post }
    );
    return users;
  }

  async function postLikers(post) {
    const users = await Store.query(
      COLLECTION + "_like",
      { post: post },
      { post: post }
    );
    return users;
  }

  return {
    list,
    get,
    upsert,
    like,
    postsLiked,
    postLikers,
  };
};
