import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class ProxyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse<Response>();

    const sourceBaseUrl = 'https://docs.nestjs.com'; // Base URL of the source
    const proxyBaseUrl = `${req.protocol}://${req.get('host')}`; // Base URL of the proxy

    // Intercept and modify only HTML responses
    if (req.headers.accept?.includes('text/html')) {
      const originalSend = res.send.bind(res);

      res.send = (html: string): Response => {
        // Rewrite absolute URLs to stay on the proxy for navigation
        const modifiedHtml = html
          .replace(new RegExp(`href="${sourceBaseUrl}`, 'g'), `href="${proxyBaseUrl}`)
          .replace(/href="\/([^"]*)"/g, `href="${proxyBaseUrl}/$1"`) // Rewrite relative navigation URLs
          .replace(/src="\/([^"]*)"/g, `src="${sourceBaseUrl}/$1"`) // Rewrite relative resource URLs
          .replace(/href="\/([^"]*\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))"/g, `href="${sourceBaseUrl}/$1"`); // Rewrite href for resource URLs

        return originalSend(modifiedHtml);
      };
    }

    return next.handle();
  }
}
