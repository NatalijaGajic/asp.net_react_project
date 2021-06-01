using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.services;
using ReservationSystem.Core.models;
using Microsoft.Extensions.DependencyInjection;
using ReservationSystem.Core.Utils;

namespace ReservationSystem.Filters
{
    public class UniqueWorkerAccountValidationFIlter: IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            AccountsService _accountsService = (AccountsService)context.HttpContext.RequestServices.GetService<IAccountsService>();

            try
            {
                var postRequest = context.ActionArguments["workerAccount"] as WorkerAccountCreationDto;
                var putRequest = context.ActionArguments["workerAccount"] as WorkerAccountUpdateDto;
                if (postRequest != null)
                {
                    //TODO: If properties are null
                    string username = postRequest.Username;
                    string email = postRequest.Email;
                    ClientAccount clientWithUsername = _accountsService.GetClientAccountByUsername(username);
                    ClientAccount clientWithEmail = _accountsService.GetClientAccountByEmail(email);
                    WorkerAccount workerWithUsername = _accountsService.GetWorkerAccountByEmail(email);
                    WorkerAccount workerWithEmail = _accountsService.GetWorkerAccountByUsername(username);
                    if (clientWithUsername != null || clientWithEmail != null || workerWithUsername
                        != null || workerWithEmail != null)
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
                    if (!CheckIdHelpper.CheckId(id))
                    {
                        context.Result = new BadRequestObjectResult("Id is not a valid 24 digit hex string");
                        return;
                    }
                    ClientAccount clientWithId = _accountsService.GetClientAccount(id);
                    if (clientWithId == null)
                    {
                        context.Result = new NotFoundObjectResult("Worker account with id not found");
                        return;
                    }
                    ClientAccount clientWithUsername = _accountsService.GetClientAccountByUsername(username);
                    WorkerAccount workerWithUsername = _accountsService.GetWorkerAccountByUsername(username);
                    if ((workerWithUsername != null && workerWithUsername.Id != id) || clientWithUsername != null)
                    {
                        throw new Exception("Username and email should be unique");
                    }
                }
                else
                {
                    throw new Exception("Wrong request format");
                }

            }
            catch (Exception e)
            {
                context.Result = new BadRequestObjectResult(e.Message);
                return;
            }
            await next();
        }
    }
}
