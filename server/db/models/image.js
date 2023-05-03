'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getImageable(options) {
      if(!this.imageableType) return Promise.resolve(null);

      let method = `get${this.imageableType}`;
      return this[method](options)
    }
    static associate(models) {
      // define association here
      Image.belongsTo(models.UserProfile, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.BlogPost, {
        foreignKey: 'imageableId',
        constraints: false
      });
    }
  };
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true
      }
    },
    imageableType: DataTypes.ENUM('UserProfile', 'BlogPost'),
    imageableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
