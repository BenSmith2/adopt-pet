const PetController = require("../controllers/pet.controller")
module.exports = app => {
    app.post("/api/pet/new", PetController.createPet)
    app.get("/api/pets", PetController.findAllPets)
    app.get("/api/pet/:id", PetController.displayPet)
    app.put("/api/pet/update/:id", PetController.updatePet)
    app.delete("/api/pet/adopt/:id", PetController.deletePet)
}