import { Sequelize, DataTypes, Model } from 'sequelize';

interface ProductAttributes {
  id?: number;
  handle: string;
  title: string;
  description: string;
  sku: string ;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode?: string | null;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public handle!: string;
  public title!: string;
  public description!: string;
  public sku!: string;
  public grams!: number;
  public stock!: number;
  public price!: number;
  public comparePrice!: number;
  public barcode!: string | null;

  static initialize(sequelize: Sequelize) {
    Product.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      handle: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sku: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      grams: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      comparePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      barcode: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'Products', 
      timestamps: false
    });
  }
}

export { Product, ProductAttributes };
