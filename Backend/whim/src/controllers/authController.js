import { userRepository, emailExists } from "../repositories/userRepository";
import { JwtService } from "../services/jwt";
const AuthController = {
    register: async (req, res, next) => {
        try {
            if(await emailExists(req.body.email)){
                res.status(400).json({msg: `There is already an user with that email`});
            }else{
                if (req.body.password == req.body.password2) {

                    let createdUser = await userRepository.create({
                        name: req.body.name,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        address: req.body.address,
                        city: req.body.city,
                        role: "user"
                    });

                    const token = JwtService.sign(createdUser);
                    res.status(201).json({
                        token: token
                    });
                    console.log(createdUser);
                } else {
                    res.status(400).json({
                        msg: `Passwords don't match`
                    });
                }
            }
        } catch (error) {
            res.status(404).json({
                error: `There was an error with the request: ${error.msg}`,
            });
        }
    },

    login: (req, res, next) => {
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token,
        });
    },
    
};

export { AuthController };