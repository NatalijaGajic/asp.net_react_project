using Microsoft.IdentityModel.Tokens;
using ReservationSystem.Core.Contracts;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using ReservationSystem.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAccountsService _accountsService;
        //Maybe service cant map from appsettings
        private readonly JwtSettings _jwtSettings;

        public AuthService(IAccountsService accountsService, JwtSettings jwtSettings)
        {
            _accountsService = accountsService;
            _jwtSettings = jwtSettings;
        }
        public AuthenticationResult Login(string email, string password)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            ClientAccount client = _accountsService.GetClientAccountByEmail(email);
            if(client == null)
            {
                WorkerAccount worker = _accountsService.GetWorkerAccountByEmail(email);
                if(worker == null)
                {
                    return new AuthenticationResult
                    {
                        Error = "Account with email not found",
                        Success = false
                    };
                }
                if (BCrypt.Net.BCrypt.Verify(password, worker.Password))
                {
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                            new Claim("id", worker.Id),
                            new Claim(ClaimTypes.Role, worker.Role.Name)
                        }),
                        Expires = DateTime.UtcNow.AddHours(2),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    return new AuthenticationResult
                    {
                        Token = tokenHandler.WriteToken(token),
                        Success = true
                    };
                }
                return new AuthenticationResult
                {
                    Error = "User/password combination is wrong",
                    Success = false
                };
            }
            if (BCrypt.Net.BCrypt.Verify(password, client.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                        {
                            new Claim("id", client.Id),
                            new Claim(ClaimTypes.Role, client.Role.Name)
                        }),
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return new AuthenticationResult { 
                    Token = tokenHandler.WriteToken(token), 
                    Success = true
                };
            }
            return new AuthenticationResult
            {
                Error = "User/password combination is wrong",
                Success = false
            };
        }

    }
}
