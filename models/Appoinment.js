import { Model } from "sequelize";

export class Appoinment extends Model {}

export default (db, DataTypes) => {
  Appoinment.init(
    {
      // Definición de los campos del modelo
      pk_appoinment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      date_next_appoinment: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      appoinment_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pk_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      pk_patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      pk_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize:db, 
      modelName: 'appoinment',
      tableName: "t_appoinment",
      timestamps: true,
      paranoid: true,
    }
  );

  return Appoinment;
};
