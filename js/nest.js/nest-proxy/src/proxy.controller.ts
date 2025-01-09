import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { ProxyInterceptor } from './proxy.interceptor';

@Controller()
@UseInterceptors(ProxyInterceptor)
export class ProxyController {
  @Get('*')
  async handleProxy(@Req() req: Request, @Res() res: Response): Promise<void> {
    const targetUrl = req['proxyTargetUrl']; // Provided by middleware
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        res.status(response.status).send(`Failed to fetch ${targetUrl}`);
        return;
      }
      const content = await response.text();
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.set('Content-Type', contentType);
      }
      res.send(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
