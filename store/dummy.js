const db = {
  user: [
    {
      id: "1",
      name: "Carlos",
    },
  ],
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let col = await list(table);
  return col.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
}

async function remove(table, id) {
  return true;
}

async function query(table, params) {
  let col = await list(table);
  let keys = Object.keys(params);
  let key = keys[0];
  return col.filter((item) => item[key] === params[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
