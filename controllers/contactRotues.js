const asyncHandler = require("express-async-handler");
const Contact  = require("../models/contactModel");



const  getAllContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({user_id: req.user.id})
    return res.status(200).send({message: "all contacts", data: contact})
})

const createContact = asyncHandler(async (req , res) => {
    console.log(req.body)
    // const contact = await Contact.create({
    //     user_id: req.user.id,
    //     name: req.name,
    //     email: req.email,
    //     phone: req.phone
    // })

    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    contact = await Contact.create({
        user_id: req.user.id,
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
    if(req.params.id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user is not authorized to update a contact which doesnot belongs to him")
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

    if(req.params.id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user is not authorized to delete a contact which doesnot belongs to him")
    }

    await Contact.deleteOne({_id: req.params.id})
    return res.status(200).send({message: `delete contact by id ${req.params.id}`, data: contact})
})



module.exports = {
    getAllContacts,
    createContact,
    getContactById,
    updateContactsById,
    deleteContactById
};