
import jwt from 'jsonwebtoken';

const generateJWT = (pk_user, user) => {
  return new Promise((resolve, reject) => {
    const payload = {pk_user,user};

    jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {expiresIn: '1h'},
        (err,token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');

            }else{
                resolve(token);
            }
        }
    )
  });
};

export {
    generateJWT
  };
  