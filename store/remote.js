const fetch = require("node-fetch");

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  async function list(table) {
    return req("GET", table);
  }

  function get(table, id) {
    return req("GET", table, id);
  }

  function insert(table, data) {
    return req("POST", table, data);
  }

  function update(table, data) {
    return req("PUT", table, data);
  }

  function upsert(table, data) {
    if (data.id) {
      return update(table, data);
    }
    return insert(table, data);
  }

  function query(table, query, join) {
    return req("POST", table + "/query", { query, join });
  }

  async function req(method, table, data) {
    let url = `${URL}/${table}`;
    let body = null;

    if (method === "GET" && data) {
      url += "/" + data;
    } else if (data) {
      body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
        },
        body,
      });
      return await response.json();
    } catch (error) {
      console.error("Error con la base de datos remota", error);
    }
  }

  return {
    list,
    get,
    upsert,
    query,
  };
}

module.exports = createRemoteDB;
