import { Model } from "sequelize";

export class LivingPlace extends Model {}

export default (db, DataTypes) => {
  LivingPlace.init(
    {
      pk_living_place: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      municipality: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pk_patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "livingPlace",
      tableName: "t_living_place",
      timestamps: true,
      paranoid: true,
    }
  );

  return LivingPlace;
};
