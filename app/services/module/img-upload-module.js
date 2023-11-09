'use strict'
require('dotenv').config()
const { Storage } = require('@google-cloud/storage')
const dateFormat = require('dateformat')
const serviceaccountkey = require('../../config/serviceaccountkey')

// const pathKey = ''

// console.log(serviceaccountkey)

const gcs = new Storage({
  projectId: serviceaccountkey.project_id,
  credentials: serviceaccountkey,
})

const bucketName = process.env.BUCKET_NAME
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

const ImgUpload = {}

ImgUpload.uploadToGcs = (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (!req.file) {
      return reject('No image file received')
    }

    const gcsname = dateFormat(new Date(), 'yyyymmdd-HHMMss')
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err
      reject(err)
    })

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      resolve()
    })

    stream.end(req.file.buffer)
  })
}

module.exports = ImgUpload
