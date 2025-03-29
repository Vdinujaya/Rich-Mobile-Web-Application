const express = require('express');
const Order = require('../models/order');
const Item = require('../models/item');
const router = express.Router();

// POST - Place a new order
router.post('/', async (req, res) => {
    try {
        // Validate the item exists and has enough stock
        const item = await Item.findById(req.body.itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        if (item.stock < req.body.quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        // Create the order
        const order = new Order({
            itemId: req.body.itemId,
            itemName: item.name,
            itemPrice: item.price,
            customerName: req.body.name,
            customerAddress: req.body.address,
            customerPhone: req.body.phone,
            customerEmail: req.body.email,
            quantity: req.body.quantity,
            totalPrice: item.price * req.body.quantity
        });

        await order.save();

        // Update item stock
        item.stock -= req.body.quantity;
        await item.save();

        return res.status(201).json({ 
            success: "Order placed successfully", 
            order: order 
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Get all orders (admin only)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });
        return res.status(200).json(order);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Get orders by customer email
router.get('/customer/:email', async (req, res) => {
    try {
        const orders = await Order.find({ customerEmail: req.params.email })
                                .sort({ orderDate: -1 });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// PUT - Update order status (admin only)
router.put('/:id/status', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!order) return res.status(404).json({ error: "Order not found" });
        return res.status(200).json({ 
            success: "Order status updated", 
            order: order 
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// DELETE - Cancel order (only if not shipped/delivered)
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });

        if (['shipped', 'delivered'].includes(order.status)) {
            return res.status(400).json({ error: "Cannot cancel order that has already been shipped or delivered" });
        }

        // Restore item stock
        const item = await Item.findById(order.itemId);
        if (item) {
            item.stock += order.quantity;
            await item.save();
        }

        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: "Order cancelled successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
// GET - Get order statistics (counts and revenue)
router.get('/stats/summary', async (req, res) => {
    try {
        const pendingCount = await Order.countDocuments({ status: 'pending' });
        const deliveredCount = await Order.countDocuments({ status: 'delivered' });
        
        const deliveredOrders = await Order.find({ status: 'delivered' });
        const deliveredRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        return res.status(200).json({
            pendingOrders: pendingCount,
            deliveredOrders: deliveredCount,
            deliveredRevenue: deliveredRevenue
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;