const asyncHandler = require("express-async-handler");
const  getAllContacts = async (req, res) => {
    return res.status(200).send({message: "all contacts"})
}

const createContact = asyncHandler(async (req , res) => {
    console.log(req.body)

    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    return res.status(200).send({message: "create contact"})
})

const getContactById = asyncHandler(async (req , res) => {
    return res.status(200).send({message: `get contact by of id ${req.params.id}`})
})

const updateContactsById = asyncHandler(async (req ,res) => {
    return res.status(200).send({message: `update contact by id ${req.params.id}`})
})

const deleteContactById = asyncHandler(async (req , res) => {
    return res.status(200).send({message: `delete contact by id ${req.params.id}`})
})



module.exports = {
    getAllContacts,
    createContact,
    getContactById,
    updateContactsById,
    deleteContactById
};