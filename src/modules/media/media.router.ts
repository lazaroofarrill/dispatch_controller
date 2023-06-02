import { Container } from 'typedi'
import express from 'express'
import { MediaController } from './media.controller'

const mediaRouter = express.Router()
const mediaController = Container.get(MediaController)

mediaRouter.get('/presigned-url', (req, res, next) =>
  mediaController
    .getUploadUrl(req.query.key as string)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

mediaRouter.get('/:key', (req, res, next) =>
  mediaController
    .getPublicUrl(req.params.key)
    .then((result) => res.redirect(result.url))
    .catch((err) => next(err))
)

export { mediaRouter }
