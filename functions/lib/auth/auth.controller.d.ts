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
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getToken(query: AuthorizationCodeDto): Observable<Token>;
    refreshToken(query: RefreshDto): Observable<Token>;
}
export {};
