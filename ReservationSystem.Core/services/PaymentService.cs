using MongoDB.Driver;
using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public Payment AddPayment(Payment payment)
        {
            _paymentRepository.AddPayment(payment);
            return payment;
        }

        public void DeletePayment(string id)
        {
            _paymentRepository.DeletePayment(id);
        }

        public Payment GetPayment(string id)
        {
            return _paymentRepository.GetPayment(id);
        }

        public List<Payment> GetPayments()
        {
            return _paymentRepository.GetPayments();
        }

        public Payment UpdatePayment(Payment payment)
        {
            _paymentRepository.GetPayment(payment.Id);
            _paymentRepository.UpdatePayment(payment);
            return payment;
        }
    }
}
