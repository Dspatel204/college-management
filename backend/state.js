let mongoConnected = false;

function setMongoConnected(value) {
  mongoConnected = value;
}

function getMongoConnected() {
  return mongoConnected;
}

module.exports = {
  setMongoConnected,
  getMongoConnected,
};
