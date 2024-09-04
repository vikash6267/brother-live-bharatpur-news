const contactModel = require("../models/contactModel")

const createContactCtrl = async (req, res) => {
    try {
        const { name, email, location, message } = req.body;
        if (!name || !email || !location || !message) {
            return res.status(400).json({
                success: false,
                message: "Please Provide all fields"
            })
        }
        const contact = await contactModel.create({ name, email, location, message });
        return res.status(201).json({
            success: true,
            message: "Contact created successfully!",
            contact
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating contact "
        })
    }
}

module.exports = { createContactCtrl }