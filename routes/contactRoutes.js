const express = require('express');
const { getAllContacts, createContact, getContactById, updateContactsById, deleteContactById } = require('../controllers/contactRotues');



const router = express.Router();


router.route("/").get(getAllContacts)



router.route("/").post(createContact)


router.route("/:id").get(getContactById)


router.route("/:id").put(updateContactsById)


router.route("/:id").delete(deleteContactById)





module.exports = router
