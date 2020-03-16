module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    autor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
