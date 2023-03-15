'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class charters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  charters.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    data: DataTypes.TEXT,
    icon: DataTypes.TEXT,
    long: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'charters',
  });
  return charters;
};