const db = require("../data/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateUser,
  deleteUser,
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function updateUser(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function deleteUser(id) {
  return db("users")
    .where("id", id)
    .del();
}