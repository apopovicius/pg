import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LINKEDIN_API, SCOPE_NEW } from './linkedin.api';
import * as assert from 'node:assert';
import * as crypto from 'node:crypto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('linkedin')
  @Redirect(LINKEDIN_API.AUTHORIZATION, 302)
  redirectToLinkedIn() {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.LINKEDIN_CLIENT_ID,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      scope: SCOPE_NEW,
      state: crypto.randomBytes(20).toString('hex'),
    }).toString();
    const url = `${LINKEDIN_API.AUTHORIZATION}?${params}`;
    return { url: url };
  }

  @Get('linkedin/callback')
  async handleCallback(@Query('code') code: string) {
    assert(code, 'Invalid code received');
    const accessToken = await this.authService.getAccessToken(code);
    const profile = await this.authService.getProfile(accessToken);
    return profile;
  }
}
