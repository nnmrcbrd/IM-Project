const express = require("express");
const app = express();
const contact = require("./contact.json");

app.use(express.json());

app.get("/api/contact", (req, res) => {
  res.json(contact);
});

app.post("/api/add-contact", (req, res) => {
  contact.push(req.body);
  res.json({ message: "Contact added", contact });
});

app.put("/api/contact/:index", (req, res) => {
  const i = parseInt(req.params.index);
  if (i < 0 || i >= contact.length) {
    return res.status(404).json({ message: "Contact not found" });
  }
  contact[i] = req.body;
  res.json({ message: "Contact updated", contact: contact[i] });
});

app.delete("/api/contact/:index", (req, res) => {
  const i = parseInt(req.params.index);
  if (i < 0 || i >= contact.length) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const removed = contact.splice(i, 1);
  res.json({ message: "Contact deleted", removed });
});

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
