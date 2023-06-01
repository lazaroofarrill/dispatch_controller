import { Container, Service } from 'typedi'
import express from 'express'

const mediaRouter = express.Router()

@Service()
class MediaController {

  async getUploadUrl(): Promise<{ url: string }> {
    return {
      url: ''
    }
  }

}

const mediaController = Container.get(MediaController)

mediaRouter.put('/', (req, res, next) =>
  mediaController.getUploadUrl()
    .then(result => res.send(result))
    .catch(err => next(err))
)

export { mediaRouter }
