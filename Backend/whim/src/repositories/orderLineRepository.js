
import { OrderLine } from "../models/orderLine"

const orderLineRepository = {
    async updateById(lineId, modLine) {
        const result = OrderLine.findByIdAndUpdate(lineId, modLine)
        console.log(result);
        return result;
    },
    async delete(id) {
        return await OrderLine.deleteOne({
            _id:id,
        });
    }
};
export {orderLineRepository};
