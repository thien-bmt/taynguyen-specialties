require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/products_db";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(cors());
app.use(express.json());

const seedProducts = async () => {
    const count = await Product.countDocuments();

    if (count === 0) {
        await Product.insertMany([
            { name: "Product 1", price: 100 },
            { name: "Product 2", price: 200 },
            { name: "Product 3", price: 300 },
        ]);
    }
};

app.get("/api/products", async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        next(error);
    }
});

app.post("/api/products", async (req, res, next) => {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const newProduct = await Product.create({ name, price });
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        next(error);
    }
});

app.put("/api/products/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                price: req.body.price,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        next(error);
    }
});

app.delete("/api/products/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
});

mongoose
    .connect(mongoUri)
    .then(async () => {
        await seedProducts();

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    });