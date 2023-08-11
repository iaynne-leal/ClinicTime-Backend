import { Model } from "sequelize";

export class UserPatient extends Model {}

export default (db, DataTypes) => {
  UserPatient.init( {
	
    pk_user_patient: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

    pk_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    pk_patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},
{
    sequelize:db, 
    modelName: 'userPatient',
    tableName: "t_user_patient",
    timestamps: true,
    paranoid: true
  })

return UserPatient
};

