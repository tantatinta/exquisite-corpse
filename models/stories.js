module.exports = function(sequelize) {
  var Story = sequelize.define("Story", {
  });
  Story.associate = function(models) {
    Story.hasMany(models.Entry, {
      onDelete: "cascade"
    });
  };
  return Story;
};
