import { Container, Service } from 'typedi'
import express from 'express'
import { MediaService } from './media.service'


@Service()
export  class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  async getUploadUrl(key?: string): Promise<{ url: string }> {
    return this.mediaService.getUploadUrl(key)
  }

  async getPublicUrl(key: string): Promise<{ url: string }> {
    return this.mediaService.getPublicUrl(key)
  }
}


