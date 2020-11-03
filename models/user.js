module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      allowNull: false,
      unqiue: true
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    role: {
      type: type.STRING,
      allowNull: false
    }
  })
}