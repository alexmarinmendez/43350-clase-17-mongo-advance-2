import mongoose from "mongoose"
import orderModel from "./models/order.model.js"

try {
    await mongoose.connect('mongodb://localhost/27017', { dbName: 'clase17' })
    console.log('DB Connected!')

    // const result = await orderModel.insertMany(
    //     [
    //         { name: 'Pepperoni', size: 'small', price: 19, quantity: 10 },
    //         { name: 'Pepperoni', size: 'medium', price: 28, quantity: 20 },
    //         { name: 'Pepperoni', size: 'medium', price: 28, quantity: 22 },
    //         { name: 'Pepperoni', size: 'medium', price: 28, quantity: 34 },
    //         { name: 'Pepperoni', size: 'large', price: 45, quantity: 64 },
    //         { name: 'Cheesse', size: 'small', price: 19, quantity: 10 },
    //         { name: 'Cheesse', size: 'medium', price: 34, quantity: 10 },
    //         { name: 'Cheesse', size: 'medium', price: 34, quantity: 10 },
    //         { name: 'Hawaina', size: 'large', price: 34, quantity: 20 },
    //         { name: 'Hawaina', size: 'medium', price: 34, quantity: 14 },
    //         { name: 'Hawaina', size: 'small', price: 34, quantity: 50 },
    //     ]
    // )

    const orders = await orderModel.aggregate([
        {$match: {size: 'medium'}},
        {
            $group: {
                _id: '$name',
                totalQty: { $sum: '$quantity' }
            }
        },
        {$sort: { _id: 1 }},
        {
            $group: {
                _id: 1,
                orders: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 0,
                orders: "$orders"
            }
        },
        {
            $merge: { into: 'reports' }
        }
    ])
    console.log(orders)
} catch(err) {
    console.log(err.message)
}