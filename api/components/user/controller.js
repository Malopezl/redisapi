const nanoid = require("nanoid");

const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function upsert(body) {
    const user = {
      name: body.name,
      id: body.id ? body.id : nanoid(),
    };
    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
