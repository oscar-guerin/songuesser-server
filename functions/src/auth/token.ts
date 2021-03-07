import { JsonProperty } from '@witty-services/ts-serializer';

export class Token {

  @JsonProperty('access_token')
  public accessToken: string;

  @JsonProperty('token_type')
  public tokenType: string;

  @JsonProperty('scope')
  public scope: string;

  @JsonProperty('expires_in')
  public expiresIn: number;

  @JsonProperty('refresh_token')
  public refreshToken?: string;
}
