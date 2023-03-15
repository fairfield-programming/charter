'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
    profile_picture: DataTypes.TEXT,
    charterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};