const { Animal } = require('../models')

const AnimalService = {
  createAnimal: async (payload) => {
    const animal = await Animal.create(payload)
    return animal.id
  },
  getAnimalById: async (payload) => {
    const animalId = parseInt(payload.id)
    const animal = await Animal.findOne({
      where: { id: animalId },
    })
    return animal
  },
  updateAnimal: async (payload) => {
    const animalId = parseInt(payload.id)
    const result = await Animal.update(payload, {
      where: { id: animalId },
    })
    return result
  },
  deleteAnimal: async (payload) => {
    const animalId = parseInt(payload.id)
    const result = await Animal.destroy({
      where: { id: animalId },
    })
    return result
  },
  getAllAnimals: async () => {
    const listAnimal = await Animal.findAll()
    return listAnimal.map((animal) => ({
      id: animal.id,
      name: animal.name,
      behaviour: animal.behaviour,
      imgUrl: animal.img_url,
    }))
  },
}

module.exports = AnimalService
