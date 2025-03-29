const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Item = require('../models/item');

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({ storage: storage });

// POST - Add Item
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        let newItem = new Item({
            name: req.body.name,
            category: req.body.category,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            specifications: req.body.specifications,
            image: req.file ? `uploads/${req.file.filename}` : null // Save file path
        });

        await newItem.save();
        return res.status(200).json({ success: "Item added successfully", data: newItem });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/items/search', async (req, res) => {
    try {
        const query = req.query.query;
        const items = await Item.find({ name: { $regex: query, $options: 'i' } });
        return res.status(200).json(items);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Fetch All Items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json(items);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Fetch Single Item by ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        return res.status(200).json(item);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// PUT - Update Item by ID
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = {
            name: req.body.name,
            category: req.body.category,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            specifications: req.body.specifications,
        };
        
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        
        if (req.file) {
            // Remove previous image
            if (item.image) {
                fs.unlinkSync(item.image);
            }
            updateData.image = `uploads/${req.file.filename}`; // Update image
        }
        
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
        return res.status(200).json({ success: "Item updated successfully", data: updatedItem });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// DELETE - Remove Item by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        
        // Remove image file
        if (item.image) {
            fs.unlinkSync(item.image);
        }
        
        await Item.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: "Item deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Get Stock Summary (total items, total stock, percentage, restockable amount)
router.get('/items/stock/summary', async (req, res) => {
    try {
        const MAX_STOCK = 500; // Maximum allowed stock
        
        // Calculate both total items count and total stock
        const result = await Item.aggregate([
            {
                $group: {
                    _id: null,
                    totalItems: { $sum: 1 }, // This counts each document as 1
                    totalStock: { $sum: "$stock" }
                }
            }
        ]);

        const summary = result.length > 0 ? result[0] : { totalItems: 0, totalStock: 0 };
        const percentage = Math.round((summary.totalStock / MAX_STOCK) * 100);
        const canRestock = MAX_STOCK - summary.totalStock;

        return res.status(200).json({
            totalItems: summary.totalItems,
            currentStock: summary.totalStock,
            maximumStock: MAX_STOCK,
            stockPercentage: `${percentage}%`,
            canRestock,
            status: percentage >= 80 ? 'High' : percentage >= 50 ? 'Medium' : 'Low'
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;