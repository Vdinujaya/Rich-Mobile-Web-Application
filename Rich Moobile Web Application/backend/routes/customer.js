const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();

// POST - Register a new customer
router.post('/register', async (req, res) => {
    try {
        const newCustomer = new Customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password, // In a real-world scenario, hash the password before saving
            phone: req.body.phone,
            address: req.body.address,
        });

        await newCustomer.save();
        return res.status(200).json({ success: "Customer registered successfully", data: newCustomer });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if customer exists
        const customer = await Customer.findOne({ email, password });
        if (!customer) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        return res.status(200).json({ success: "Login successful", data: customer });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Example backend route (Node.js/Express)
router.get("/user/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const user = await Customer.findOne({ email }); // Fetch user from database
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user); // Return user details
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET - Fetch all customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        return res.status(200).json(customers);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// GET - Fetch a single customer by ID
router.get('/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ error: "Customer not found" });
        return res.status(200).json(customer);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// PUT - Update a customer by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password, // Remember to hash the password if updating
            phone: req.body.phone,
            address: req.body.address,
        };

        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCustomer) return res.status(404).json({ error: "Customer not found" });
        return res.status(200).json({ success: "Customer updated successfully", data: updatedCustomer });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// DELETE - Remove a customer by ID
router.delete('/cusdelete/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ error: "Customer not found" });
        return res.status(200).json({ success: "Customer deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;