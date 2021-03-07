import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Token } from './token';
export declare class AuthService {
    private readonly http;
    private readonly secret;
    private readonly serializer;
    constructor(http: HttpService);
    getToken(code: string, redirectUri: string, clientId: string): Observable<Token>;
    refreshToken(refreshToken: string, clientId: string): Observable<Token>;
    private authorize;
}
