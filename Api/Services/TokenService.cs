using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Models;
using Api.Shared;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{

    public class TokenService
    {
        public static string GenerateToken(ApplicationAccessControl controlAccess)
        {
            var key = Encoding.ASCII.GetBytes(Config.Secret);
            var th = new JwtSecurityTokenHandler();            
            var td = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
              new Claim(ClaimTypes.Name, controlAccess.Name.ToString())
           }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(
                  new SymmetricSecurityKey(key),
                  SecurityAlgorithms.HmacSha256Signature
              )
            };
            
            return th.WriteToken(th.CreateToken(td));
        }

    }

}