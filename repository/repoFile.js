const dataBase = require("./db.json");
const mapDataBase = new Map(Object.entries(dataBase));
module.exports = Object.freeze({
  findById: (id) => mapDataBase.get(id),
  insert: (cars) => mapDataBase.set(cars.id.toString(), cars),
  findAll: () => Array.from(mapDataBase.values()),
  removeById: (id) => mapDataBase.delete(id),
  update: (updatedCart) => {
    if (!mapDataBase.has(updatedCart.id)) throw new Error('user not found');
    mapDataBase.set(updatedCart.id, { ...mapDataBase.get(updatedCart.id), ...updatedCart });
  },
});