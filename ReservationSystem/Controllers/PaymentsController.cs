using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentsService;
        public PaymentsController(IPaymentService paymentsService)
        {
            _paymentsService = paymentsService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_paymentsService.GetPayments());
        }

        [HttpGet("{id}", Name = "GetPayment")]
        public IActionResult GetPaymentById(string id)
        {
            return Ok(_paymentsService.GetPayment(id));
        }


        [HttpPost]
        public IActionResult AddPayment(Payment payment)
        {
            _paymentsService.AddPayment(payment);
            return CreatedAtRoute("GetPayment", new { id = payment.Id }, payment);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePayment(string id)
        {
            _paymentsService.DeletePayment(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGame(string id, Payment payment)
        {
            payment.Id = id;
            return Ok(_paymentsService.UpdatePayment(payment));
        }
    }
}
