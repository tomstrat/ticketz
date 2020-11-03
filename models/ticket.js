module.exports = (sequelize, type) => {
  return sequelize.define("ticket", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    },
    desc: {
      type: type.STRING,
      allowNull: false,
    },
    resolved: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    publishedDate: {
      type: type.DATE,
      allowNull: false,
    },
    resolvedDate: {
      type: type.DATE,
    }
  })
}