const contacts = require("../models/contacts");

async function getAll(req, res) {
  const data = await contacts.listContacts();
  res.status(200).json(data);
}

async function getById(req, res) {
  const contact = await contacts.getById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
}

async function create(req, res) {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
}

async function remove(req, res) {
  const result = await contacts.removeContact(req.params.id);
  if (!result) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
}

async function update(req, res) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updated = await contacts.updateContact(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.status(200).json(updated);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
