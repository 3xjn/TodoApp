export interface DecodedJWT {
    [key: string]: any; // Allow any key for custom claims
    exp: number; // Example of a standard claim
}

export enum JWTClaims {
    NameIdentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    EmailAddress = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    Name = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    PictureUrl = "picture_url", // Direct access, no URI
    Expiration = "exp" // Standard claim
}