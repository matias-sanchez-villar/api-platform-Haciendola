import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './Users';

interface CredentialAttributes {
  id?: number| null;
  user_id: number;
  email: string;
  password: string;
}

class Credential extends Model<CredentialAttributes> implements CredentialAttributes {
  public id!: number;
  public user_id!: number;
  public email!: string;
  public password!: string;

  static initialize(sequelize: Sequelize) {
    Credential.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Credentials', 
      timestamps: false
    });

    Credential.belongsTo(User, { foreignKey: 'user_id' });
  }
}

export { Credential, CredentialAttributes };
