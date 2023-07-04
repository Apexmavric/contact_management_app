const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const GetContacts = asyncHandler(async(req, res)=> {
    try{
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
    }
    catch(err){
        console.log(err);
        res.status(400).end();
    }
});
const CreateContact =asyncHandler(async(req, res)=>{
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "Please provide name, email, and phone" });
      return;
    }
    try {
      const ncontact = await Contact.create({ name, email, phone,user_id: req.user.id });
      res.status(201).json(ncontact);
    } catch (error) {
    console.log(error);
      res.status(500).json({ message: "Failed to create contact" });
    }
  });
  
const UpdateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to update other users contact!");
    }
    const updatedcon = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(201).json(updatedcon);
});
const GetContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found!");
    }    
    res.status(200).json(contact);
}); 
const DeleteContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to delete other users contact!");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports = {GetContacts, CreateContact,UpdateContact,GetContact,DeleteContact};