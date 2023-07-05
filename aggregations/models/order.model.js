import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    name: String,
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    price: Number,
    quantity: Number
})

const orderModel = mongoose.model('orders', orderSchema)

export default orderModel