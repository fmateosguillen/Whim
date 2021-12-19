import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

const userRepository = {
    toDto(user) {
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            role: user.role
        }
    },

    async create(nUser) {
        if (await emailExists(nUser.email)) {
            return { msg: `There is already an user with that email` };
        } else{
            let password = bcrypt.hashSync(
                nUser.password,
                parseInt(process.env.BCRYPT_ROUNDS)
            );
            
            const rUser = new User({
                name: nUser.name,
                lastName: nUser.lastName,
                email: nUser.email,
                password: nUser.password,
                phoneNumber: nUser.phoneNumber,
                address: nUser.address,
                city: nUser.city,
                role: nUser.role
            });
            const result = await rUser.save();
            return result;
        }
    },

    async findById(id) {
        return await User.findOne({ _id : id });
    },

    async findByEmail(email) {
        return await User.findOne({ email : email });
    }
}

export {userRepository, emailExists}