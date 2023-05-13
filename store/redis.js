const redis = require("redis");

const config = require("../config");

const client = redis.createClient({
  url: `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`,
});

(async () => {
  await client.connect();
  console.log("Conected to REDIS");
})();

async function list(table) {
  const value = await client.get(table);
  return JSON.parse(value);
}

async function get(table, id) {
  const value = await client.get(`${table}_${id}`);
  return JSON.parse(value);
}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) {
    key += "_" + data.id;
  }
  await client.setEx(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
};
