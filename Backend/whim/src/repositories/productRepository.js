import { Product } from "../models/product";


const productRepository = {
    async create(newProduct) {
        const product = new Product ({
            name: newProduct.name,
            brand: newProduct.brand,
            countryOfOrigin: newProduct.countryOfOrigin,
            stock: newProduct.stock,
            price: newProduct.price,
            category: newProduct.category,
            avaliable: newProduct.avaliable
        });
        const result = await product.save();
        console.log(result);
        return result;
    },

    async findById(id) {
        const result = await Product.findById(id).exec();
        return result != null ? result : undefined;
    },

    async findAll() {
        const result = await Product.find({}).exec();
        return result;
    },

    async findByCategory(category) {
        const result = await Product.find({category: category});
        return result != null ? result : undefined;
    },

    async updateById(id, modifiedProduct) {
        const savedProduct = await Product.findById(id);
        if(savedProduct != null) {
            return await Object.assign(savedProduct, modifiedProduct).save();
        } else {
            return undefined
        }
    },
    
    async delete(id) {
        return await Product.deleteOne({
            _id: id,
        });
    },

    async disable(id) {
        const savedProduct = await Product.findById(id);

        if (savedProduct != null) {
            savedProduct.avaliable = false;
            return await savedProduct;
        } else {
            return undefined
        }
    }
};

export { productRepository };