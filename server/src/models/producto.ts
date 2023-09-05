import { DataTypes } from "sequelize";
import db from "../db/connection";

//Poner el nomnbre dentro de define igual que la tabla pero en singular
const Producto = db.define(
  "Producto",
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

export default Producto;
