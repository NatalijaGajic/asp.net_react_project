using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.Contracts;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using ReservationSystem.Core.Services;
using ReservationSystem.Extensions;
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
        private readonly IAccountsService _accountsService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, IAccountsService accountsService, IMapper mapper)
        {
            _authService = authService;
            _accountsService = accountsService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Login([FromBody] UserLoginRequest request)
        {
            try
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
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }


        }

        [HttpGet("getUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public IActionResult GetUserFromToken()
        {
            try
            {
                string id = HttpContext.GetUserId();
                ClientAccount client = _accountsService.GetClientAccount(id);
                if (client != null)
                {
                    return Ok(_mapper.Map<ClientAccountDto>(client));
                }
                WorkerAccount worker = _accountsService.GetWorkerAccount(id);
                if (worker != null)
                {
                    return Ok(_mapper.Map<WorkerAccountDto>(worker));
                }
                return BadRequest("Id from token not mapped to user");
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }
    }
}
