import { Container, Service } from 'typedi'
import express from 'express'
import { MediaService } from './media.service'

const mediaRouter = express.Router()

@Service()
class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  async getUploadUrl(key?: string): Promise<{ url: string }> {
    return this.mediaService.getUploadUrl(key)
  }

  async getPublicUrl(key: string): Promise<{ url: string }> {
    return this.mediaService.getPublicUrl(key)
  }
}

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
