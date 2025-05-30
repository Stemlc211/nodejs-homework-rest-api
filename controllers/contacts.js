const Contact = require("../models/contact");

const listContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contact = await Contact.create({ name, email, phone });
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const update = req.body;
  if (!update || Object.keys(update).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, update, {
    new: true,
  });
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(updatedContact);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
