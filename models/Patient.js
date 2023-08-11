import { Model } from "sequelize";

export class Patient extends Model {}

export default (db, DataTypes) => {
  Patient.init( {
	
    pk_patient: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	name: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    birthdate: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    cod_patient: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    dpi: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
},
{
    sequelize:db, 
    modelName: 'patient',
    tableName: "t_patient",
    timestamps: true,
    paranoid: true
  })

return Patient

};

