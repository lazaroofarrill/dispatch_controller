import { Service } from 'typedi'
import { MediaService } from './media.service'
import { Get, Query, Route, Tags } from 'tsoa'
import { MediaRoutes } from './constants/media.routes'

@Tags('Media Endpoints')
@Route('media')
@Service()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(MediaRoutes.GET_UPLOAD_URL)
  async getUploadUrl(@Query() mediaId?: string): Promise<{ url: string }> {
    return this.mediaService.getUploadUrl(mediaId)
  }

  @Get(MediaRoutes.GET_PUBLIC_URL)
  async getPublicUrl(mediaId: string): Promise<{ url: string }> {
    return this.mediaService.getPublicUrl(mediaId)
  }
}
