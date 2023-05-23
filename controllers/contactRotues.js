const getAllContacts = (req, res) => {
    return res.status(200).send({message: "all contacts"})
}

const createContact = (req , res) => {
    console.log(req.body)
    return res.status(200).send({message: "create contact"})
}

const getContactById = (req , res) => {
    return res.status(200).send({message: `get contact by of id ${req.params.id}`})
}

const updateContactsById = (req ,res) => {
    return res.status(200).send({message: `update contact by id ${req.params.id}`})
}

const deleteContactById = (req , res) => {
    return res.status(200).send({message: `delete contact by id ${req.params.id}`})
}



module.exports = {
    getAllContacts,
    createContact,
    getContactById,
    updateContactsById,
    deleteContactById
};