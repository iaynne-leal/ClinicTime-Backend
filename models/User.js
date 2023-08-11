import { Model } from "sequelize";

export class User extends Model {}

export default (db, DataTypes) => {
  User.init( {
	
    pk_user: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	name_user: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    user: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    pk_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},
{
    sequelize:db, 
    modelName: 'user',
    tableName: "t_user",
    timestamps: true,
    paranoid: true
  })

  return User;
};


