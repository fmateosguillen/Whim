import { Category } from "../models/category"

const categoryRepository = {
    async create(newCategory) {
        const category = new Category({
            name: newCategory.name,
            fatherCategory: newCategory.fatherCategory
        });
        const result = await category.save();
        console.log(result);
        return result;
    },
    async findById(id) {
        const result = await Category.findById(id).exec();
        return result != null ? result : undefined;
    },

    async findAll(){
        const result = await Category.find({}).exec();
        return result;
    },

    async findByFatherCategory(id) {
        const result = await Category.find({fatherCategory: id});
        return result != null ? result : undefined;
    },

    async findByName(name) {
        const result = await Category.findOne({name: name});
        return result != null ? result : undefined;
    },

    async updateById(id, modifiedCategory) {
        const savedCategory = await Category.findById(id);
        if (savedCategory != null) {
            if (modifiedCategory.fatherCategory==undefined){
                modifiedCategory.fatherCategory=undefined
            }
            return await Object.assign(savedCategory, modifiedCategory).save();
        } else
        return undefined
    },

    async delete(id){
        return await Category.deleteOne({
            _id: id
        });
    },
};

const categoryNameExists = async (categoryName) => {
    let result = await Category.findOne({name: categoryName});
    return result
}

export { categoryRepository }