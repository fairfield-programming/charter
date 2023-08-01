'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class announcements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  announcements.init({
    userId: DataTypes.INTEGER,
    charterId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    short: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'announcements',
  });
  return announcements;
};