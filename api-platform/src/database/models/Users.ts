import { Sequelize, DataTypes, Model } from 'sequelize';

interface UserAttributes {
  id?: number| null;
  first_name: string;
  last_name: string;
  phone?: string | null;
  date_of_birth?: Date | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone!: string | null;
  public date_of_birth!: Date | null;

  static initialize(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'Users',
      timestamps: false 
    });
  }
}

export { User, UserAttributes };
