﻿using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace TodoAppAPI.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly RSA _rsa;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        public AuthController(RSA rsa, IConfiguration configuration, ILogger<AuthController> logger)
        {
            _rsa = rsa;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("signin-google")]
        public async Task<IActionResult> GoogleCallback([FromBody] GoogleSignInRequest request)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.idToken);
                var googleId = payload.Subject;
                var email = payload.Email;
                var givenName = payload.GivenName;
                var pfp = payload.Picture;

                var token = GenerateJwtToken(googleId, email, givenName, pfp);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during Google sign-in");
                return BadRequest(new { message = "Invalid Google token", error = ex.Message });
            }
        }

        [HttpGet("profile-picture")]
        [Authorize]
        public ActionResult<string> GetProfilePicture()
        {
            var profilePictureUrl = HttpContext.User.FindFirst("picture")?.Value;
            if (string.IsNullOrEmpty(profilePictureUrl))
            {
                return NotFound("Profile picture not found");
            }

            return Ok(profilePictureUrl);
        }

        private string GenerateJwtToken(string googleId, string email, string givenName, string pfp)
        {
            var privateKey = _configuration["Jwt:PrivateKey"]?.Trim();
            if (string.IsNullOrEmpty(privateKey))
            {
                throw new InvalidOperationException("JWT private key must be provided.");
            }

            RSA rsaPrivate = RSA.Create();
            rsaPrivate.ImportFromPem(privateKey);

            var signingCredentials = new SigningCredentials(
                key: new RsaSecurityKey(rsaPrivate),
                algorithm: SecurityAlgorithms.RsaSha256
            );

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Iss, "https://3xjn.dev"),
                new Claim(ClaimTypes.NameIdentifier, googleId),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, givenName),
                new Claim("picture_url", pfp)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [Authorize]
        [HttpGet("validate-token")]
        public IActionResult ValidateToken()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var name = User.FindFirst(ClaimTypes.GivenName)?.Value;

            Console.WriteLine($"User Id: {userId}");
            Console.WriteLine($"Email: {email}");
            Console.WriteLine($"Name: {name}");

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(email))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            return Ok(new { UserId = userId, Email = email, Name = name });
        }

    }

    public class GoogleSignInRequest
    {
        public string idToken { get; set; }
    }
}