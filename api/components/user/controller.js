const nanoid = require("nanoid");
const auth = require("../auth");

const TABLE = "user";

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;
  if (!store) {
    store = require("../../../store/dummy");
  }
  if (!cache) {
    cache = require("../../../store/dummy");
  }

  async function list() {
    let users = await cache.list(TABLE);

    if (!users) {
      console.log("No estaba en cache. Buscando en DB");
      users = await store.list(TABLE);
      cache.upsert(TABLE, users);
    } else {
      console.log("Hay datos en cache");
    }
    return users;
  }

  async function get(id) {
    let user = await cache.get(TABLE, id);

    if (!user) {
      user = await store.get(TABLE, id);
      cache.upsert(TABLE, user);
    }
    return user;
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
      id: body.id ? body.id : nanoid(),
    };

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }
    cache.upsert(TABLE, user);
    return store.upsert(TABLE, user);
  }

  function follow(from, to) {
    return store.upsert(TABLE + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  async function following(user) {
    const join = {};
    join[TABLE] = "user_to"; //We want to generate something like { user: user_to }
    const query = { user_from: user };
    return await store.query(TABLE + "_follow", query, join);
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
