const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactsController");
const { addSchema, updateSchema } = require("../validators/contactValidator");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
}

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(addSchema), controller.create);
router.delete("/:id", controller.remove);
router.put("/:id", validate(updateSchema), controller.update);

module.exports = router;
