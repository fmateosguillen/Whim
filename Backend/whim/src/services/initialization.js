import { Category } from "../models/category";
import { User } from "../models/user";
import { categoryNameExists, categoryRepository } from "../repositories/categoryRepository";
import { emailExists, userRepository } from "../repositories/userRepository";


const initialization = {
    async createAdmin() {
        let password = bcrypt.hashSync(
            "12340987",
            parseInt(process.env.BCRYPT_ROUNDS)
        );

        const admin = new User({
            name: "Admin",
            lastname: "Admin",
            email: "admin@admin.com",
            password: password,
            role: 'admin'
        });
        if( !await emailExists(admin.email)){
            console.log("Admin created");
            await userRepository.create(admin);
        }
    },

    async createCategoryOthers() {
        const categoryOthers = new Category({
            name: "Others"
        });

        if (!await categoryNameExists(categoryOthers.name)){
            console.log("Category created");
            await categoryRepository.create(categoryOthers);
        }
    }
};

export { initialization }