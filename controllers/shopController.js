const shopModel = require("../models/shopModel")

async function createShop (req, res) {
    let { shopName, shopAddress, shopEmail, shopPhone, shopOwner } = req.body

    try {
        let shop = new shopModel({
            shopName,
            shopAddress,
            shopEmail,
            shopPhone,
            shopOwner,
        })
        await shop.save()
        res.status(200).send({ success: true, message: "Shop created successfully" })
    } catch (error) {
        res.status(200).send({ success: false, message: "An error occurred", data: { error } })
    }
}

module.exports = { createShop }