
const UserController = {
    myUser: async (req, res, next) => {
        try{
            res.status(200).json({
                user: req.user
            });
        }catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`,
            });
        }
    }

}

export { UserController }