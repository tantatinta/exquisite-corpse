module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    }
  });
  Story.associate = function(models) {
    Story.hasMany(models.Entry, {
      onDelete: "cascade"
    });
  };
  return Story;
};
