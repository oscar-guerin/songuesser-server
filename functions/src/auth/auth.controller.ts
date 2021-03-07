import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Token } from './token';

interface AuthorizationCodeDto {
  code: string;
  redirectUri: string;
  clientId: string;
}

interface RefreshDto {
  refreshToken: string;
  clientId: string;
}

@Controller('auth')
export class AuthController {

  public constructor(private readonly authService: AuthService) {
  }

  @Get('/token')
  public getToken(@Query() query: AuthorizationCodeDto): Observable<Token> {
    return this.authService.getToken(query.code, query.redirectUri, query.clientId);
  }

  @Get('/refresh')
  public refreshToken(@Query() query: RefreshDto): Observable<Token> {
    return this.authService.refreshToken(query.refreshToken, query.clientId);
  }
}
