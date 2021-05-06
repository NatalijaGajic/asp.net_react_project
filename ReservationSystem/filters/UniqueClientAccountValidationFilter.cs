using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.services;
using ReservationSystem.Core.models;
using Microsoft.Extensions.DependencyInjection;
using System.Text.RegularExpressions;

namespace ReservationSystem.filters
{
    public class UniqueClientAccountValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            AccountsService _accountsService = (AccountsService) context.HttpContext.RequestServices.GetService<IAccountsService>();

            try
            {
                var postRequest = context.ActionArguments["clientAccount"] as ClientAccountCreationDto; 
                var putRequest = context.ActionArguments["clientAccount"] as ClientAccountUpdateDto;
                if (postRequest != null)
                {
                    //TODO: If properties are null
                    string username = postRequest.Username;
                    string email = postRequest.Email;
                    ClientAccount clientWithUsername = _accountsService.GetClientAccountByUsername(username);
                    ClientAccount clientWithEmail = _accountsService.GetClientAccountByEmail(email);
                    if (clientWithUsername != null || clientWithEmail != null)
                    {
                        throw new Exception("Username and email should be unique");
                    }
                }
                else if (putRequest != null) 
                {
                    //TODO: If properties are null
                    //TODO: id will be null if post gets updatedto
                    string username = putRequest.Username;
                    string id = (string)context.ActionArguments["id"];
                    //TODO: Check if id is valid 24 digit hex string, mongodb objectid 
                    var checkForHexRegExp = new Regex("^[0-9a-fA-F]{24}$");
                    if (!checkForHexRegExp.IsMatch(id)){
                        context.Result = new BadRequestObjectResult("Id is not a valid 24 digit hex string");
                        return;
                    }
                    ClientAccount clientWithId = _accountsService.GetClientAccount(id);
                    if(clientWithId == null)
                    {
                        context.Result = new NotFoundObjectResult("Client account with id not found");
                        return;
                    }
                    ClientAccount clientWithUsername = _accountsService.GetClientAccountByUsername(username);
                    if (clientWithUsername != null && clientWithUsername.Id != id)
                    {
                        throw new Exception("Username and email should be unique");
                    }
                }
                else
                {
                    throw new Exception("Wrong request format");
                }
                
            }
            catch(Exception e)
            {
                context.Result = new BadRequestObjectResult(e.Message);
                return;
            }
            await next();
        }
    }
}
