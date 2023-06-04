import { Container } from 'typedi'
import express from 'express'
import { MediaController } from './media.controller'
import { MediaRoutes } from './constants/media.routes'

const mediaRouter = express.Router()
const mediaController = Container.get(MediaController)

mediaRouter.get(MediaRoutes.GET_UPLOAD_URL, (req, res, next) =>
  mediaController
    .getUploadUrl(req.query.key as string)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

mediaRouter.get(MediaRoutes.GET_PUBLIC_URL, (req, res, next) =>
  mediaController
    .getPublicUrl(req.params.mediaId)
    .then((result) => res.redirect(result.url))
    .catch((err) => next(err))
)

export { mediaRouter }
