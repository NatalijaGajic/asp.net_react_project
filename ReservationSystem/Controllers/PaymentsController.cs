using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.Exceptions;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;
using System.Net;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentsService;
        private readonly IMapper _mapper;

        public PaymentsController(IPaymentService paymentsService, IMapper mapper)
        {
            _paymentsService = paymentsService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                return (Ok(_mapper.Map<PaymentDto>(_paymentsService.GetPayments())));
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //TODO: authorize so users can only see payments they made, workers can see all
        [HttpGet("{id}", Name = "GetPayment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetPaymentById(string id)
        {
            try
            {
                Payment p = _paymentsService.GetPayment(id);
                if (p == null)
                {
                    return NotFound("Payment with id not found");
                }
                return Ok(_mapper.Map<PaymentDto>(p));
            }
            catch ( Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }


        [HttpPost]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddPayment(PaymentCreationDto payment)
        {
            try
            {
                Payment p = _mapper.Map<Payment>(payment);
                p = _paymentsService.AddPayment(p);
                return CreatedAtRoute("GetPayment", new { id = p.Id }, p);
            }
            catch (Exception ex)
            {
                if (ex.GetType().IsAssignableFrom(typeof(InvalidForeignKeyException)))
                {
                    return StatusCode(StatusCodes.Status409Conflict, ex.Message);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
            
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeletePayment(string id)
        {
            try
            {
                if (_paymentsService.DeletePayment(id))
                {
                    return NotFound("Payment with id not found");
                }
                return NoContent();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        //No put
    }
}
