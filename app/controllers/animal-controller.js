const { Animal } = require("../models");

const AnimalController = {
  getAllAnimal: async (req, res) => {
    try {
      const animals = await Animal.findAll();
      res.json(animals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createAnimal: async (req, res) => {
    const { name, species } = req.body;
    try {
      const newAnimal = await Animal.create({ name, species });
      res.status(201).json(newAnimal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateAnimal: async (req, res) => {
    const { id } = req.params;
    const { name, species } = req.body;
    try {
      const animal = await Animal.findByPk(id);
      if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
      }
      await animal.update({ name, species });
      res.json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteAnimal: async (req, res) => {
    const { id } = req.params;
    try {
      const animal = await Animal.findByPk(id);
      if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
      }
      await animal.destroy();
      res.json({ message: "Animal deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // createAnimal: async (req, res, next) => {},
  // updateAnimal: async (req, res, next) => {},
  // deleteAnimal: async (req, res, next) => {},
  // getAllAnimal: async (req, res, next) => {},
};

module.exports = AnimalController;
