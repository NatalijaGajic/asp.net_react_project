using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.Contracts;
using ReservationSystem.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginRequest request)
        {
            var authResponse = _authService.Login(request.Email, request.Password);
            if (authResponse.Success)
            {
                return Ok(new LoginSuccessResponse
                {
                    Token = authResponse.Token
                });
            }
            return BadRequest(new LoginFailedResponse
            {
                Error = authResponse.Error
            });

        }
    }
}
