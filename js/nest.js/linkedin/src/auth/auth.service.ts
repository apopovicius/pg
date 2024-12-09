import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LINKEDIN_API } from './linkedin.api';

@Injectable()
export class AuthService {
  async getAccessToken(code: string): Promise<string> {
    const { data } = await axios.post(
      LINKEDIN_API.ACCESS_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return data.access_token;
  }

  async getProfile(accessToken: string): Promise<any> {
    const { data } = await axios.get(LINKEDIN_API.USER_INFO, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  }
}
