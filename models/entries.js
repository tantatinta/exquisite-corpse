module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    author: {
      type: DataTypes.STRING
    },
  });
  Entry.associate = function(models) {
    Entry.belongsTo(models.Story, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Entry;
};
