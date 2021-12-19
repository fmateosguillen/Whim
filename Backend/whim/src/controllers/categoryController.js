import { categoryRepository } from "../repositories/categoryRepository"
import { productRepository } from "../repositories/productRepository";

const CategoryController = {
    createCategory: async (req, res, next) => {
        try {
            if (
                (await categoryRepository.findById(req.body.fatherCategory)) ==
                undefined && req.body.fatherCategory != undefined
            ) {
                res 
                    .status(400)
                    .json({
                        msg: `400: The category whose ID is: ${req.body.fatherCategory} doesn't exist`,
                    });
            } else {
                let newCategory = await categoryRepository.create({
                    name: req.body.name,
                    fatherCategory: req.body.fatherCategory,
                });
                res.status(201).json(newCategory);
            }
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`,
            });
        }
    },

    delete: async (req, res) => {
        try {
            let daughterCategories = await categoryRepository.findByFatherCategory(
                req.params.id
            );
            daughterCategories.forEach((category) =>
                categoryRepository.delete(category._id)
            );
            let otherCategories = await categoryRepository.findByName("Others");
            let productList = await productRepository.findByCategory(req.params.id);
            productList.forEach(function(product) {
                product.category = otherCategories._id;
                productRepository.save();
            })
            const result = await categoryRepository.delete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`
            });
        }
    },
    edit: async (req, res) => {
        try {
            let category = await categoryRepository.updateById(req.params.id, req.body);
            if(category == undefined){
                res.status(404).json({
                    msg: `404: The category whose ID is: ${req.body.fatherCategory} doesn't exist`
                });
            } else{
                category != undefined ? res.status(200).json(category) : res.status(404).json({msg: `The category whose ID is: ${req.body.fatherCategory} doesn't exist`});
            }
        } catch (error) {
            res
                .status(404)
                .json({
                    error: `The category whose ID is: ${req.body.fatherCategory} doesn't exist`
                });
        }
    },
    findAll: async(req, res) => {
        try{
            let categoryList = await categoryRepository.findAll();
            if(categoryList.length==0){
                res.status(404).json ({
                    msg: `404: There are no elements in the database`
                });
            } else {
                res.status(200).json(categoryList);
            }
        } catch (error) {
            res
                .status(404)
                .json({
                    error: `There was an error in the request: ${error.msg}`
                });
        }
    }
};

export { CategoryController };