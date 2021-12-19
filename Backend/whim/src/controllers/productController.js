import { categoryRepository } from "../repositories/categoryRepository"
import { productRepository } from "../repositories/productRepository";

const ProductController = {
    createProduct: async (req, res, next) => {
        try {
            if (
                (await categoryRepository.findById(req.body.category)) == undefined &&
                req.body.category != undefined
            ) {
                res.status(400).json({
                    msg: `400: The category whose ID is: ${req.body.category} doesn't exist`,
                });
            } else {
                let newProduct = await productRepository.create({
                    name: req.body.name,
                    brand: req.body.brand,
                    countryOfOrigin: req.body.countryOfOrigin,
                    stock: req.body.stock,
                    price: req.body.price,
                    category: req.body.category,
                    avaliable: req.body.avaliable
                });
                res.status(201).json(newProduct);
            }
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`
            });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await productRepository.delete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).json ({
                error: `There was an error in the request: ${error.msg}`,
            });
        }
    },

    edit: async (req, res) => {
        try {
            let product = await productRepository.updateById(
                req.params.id,
                req.body
            );
            product != undefined
            ? res.status(200).json(product)
            : res.status(404).json({
                msg: `The product whose ID is: ${req.params.id} doesn't exist`
            });
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`
            });
        }
    },

    findAll: async (req, res) => {
        try {
            let productList = await productRepository.findAll();
            if (productList.length == 0) {
                res.status(404).json({
                    msg: `404: There are no elements in the database`
                });
            } else {
                res.status(202).json(productList);
            }
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`
            });
        }
    },

    findByCategory: async (req, res) => {
        try {
            let productList = await productRepository.findByCategory(
                req.body.category
            );
            if (productList.length == 0) {
                res.status(404).json({
                    msg: `404: There are no elements in the database`
                });
            } else {
                res.status(200).json(productList);
            }
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`,
            });
        }
    },

    findById: async (req, res) => {
        try {
            let product = await productRepository.findById(req.params.id);
            return product != null
            ? res.status(200).json(product)
            : res.status(404).json({
                msg: `The product whose ID is: ${req.params.id} doesn't exist`
            });
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`
            });
        }
    }
};

export { ProductController }