const router = require("express-promise-router")();
const ClientController = require("../controllers/clientController");

router.get("/", ClientController.findAll);
router.get("/:id", ClientController.findById);
router.post("/", ClientController.create);
router.put("/:id", ClientController.update);
router.delete("/", ClientController.delete);

module.exports = router;