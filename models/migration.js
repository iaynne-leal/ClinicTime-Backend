import { db } from "../database/connection.js";
import { Appoinment } from "./Appoinment.js";
import { LivingPlace } from "./LivingPlace.js";
import { Patient } from "./Patient.js";
import { Role } from "./Role.js";
import { User } from "./User.js";
import { UserPatient } from "./UserPatient.js";

(async () => {

    await Role.sync();
    await Appoinment.sync({ force: true });
    await LivingPlace.sync();
    await Patient.sync();
    await User.sync();
    await UserPatient.sync(); 

    await db.sync({ force: true});
  
  console.log("Database migrated successfully");
})();
