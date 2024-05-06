import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import type { OauthV2AccessResponse } from '@slack/web-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getToken(
    @Req() request: Request,
  ): Promise<OauthV2AccessResponse | string> {
    const code = request.query.code as string | undefined;
    const error = request.query.error as string | undefined;
    const clientId = process.env.client_id; // 認可リクエストを送る際にも使用したClient ID
    const clientSecret = process.env.client_secret; // Client IDの下で確認できるClient Secret

    return this.appService.getToken(code, error, clientId, clientSecret);
  }
}
