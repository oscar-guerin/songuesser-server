import { HttpService, Injectable } from '@nestjs/common';
import qs from 'qs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Token } from './token';
import { Denormalizer, Normalizer, Serializer } from '@witty-services/ts-serializer';

@Injectable()
export class AuthService {

  private readonly secret: string = '1154a57c87724943b760882985de35b2';
  private readonly serializer: Serializer;

  public constructor(private readonly http: HttpService) {
    this.serializer = new Serializer(new Normalizer(), new Denormalizer());
  }

  public getToken(code: string, redirectUri: string, clientId: string): Observable<Token> {
    const data: unknown = {
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: this.secret,
      code
    };

    return this.authorize(data);
  }

  public refreshToken(refreshToken: string, clientId: string): Observable<Token> {
    const data: unknown = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: this.secret
    };

    return this.authorize(data);

  }

  private authorize(data: unknown): Observable<Token> {
    return this.http.post('https://accounts.spotify.com/api/token', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      map((response: AxiosResponse) => this.serializer.deserialize(Token, response.data))
    );
  }
}
