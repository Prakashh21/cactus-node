const asyncHandler = require("express-async-handler");
const Contact  = require("../models/contactModel");



const  getAllContacts = async (req, res) => {
    const contact = await Contact.find({})
    return res.status(200).send({message: "all contacts", data: contact})
}

const createContact = asyncHandler(async (req , res) => {
    console.log(req.body)

    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    contact = await Contact.create({
        name,
        email,
        phone,
    })    
    return res.status(201).send({message: "create contact", data: contact})
})

const getContactById = asyncHandler(async (req , res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    return res.status(200).send({message: `get contact by of id ${req.params.id}`, data:contact})
})

const updateContactsById = asyncHandler(async (req ,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body , {new: true})
    
     res.status(200).json({message: `update contact by id ${req.params.id}`, data: updatedContact})
})



const deleteContactById = asyncHandler(async (req , res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    await Contact.deleteOne(contact)
    return res.status(200).send({message: `delete contact by id ${req.params.id}`, data: contact})
})



module.exports = {
    getAllContacts,
    createContact,
    getContactById,
    updateContactsById,
    deleteContactById
};