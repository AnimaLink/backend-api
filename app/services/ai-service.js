require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const { Buffer } = require('buffer')

const { AI_SERVICE_URL } = process.env

const AiService = {
  checkAnimalStatus: async (file) => {
    const formData = new FormData()

    // access from buffer bcs multer store file in memory
    formData.append('file', Buffer.from(file.buffer), {
      filename: file.originalname,
    })

    const result = await axios.post(AI_SERVICE_URL, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    })

    return result.data
  },
}

module.exports = AiService
