using MongoDB.Driver;
using ReservationSystem.Core.Exceptions;
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
        private readonly IAccountsService _accountsService;
        private readonly IReservationsService _reservationsService;

        public PaymentService(IPaymentRepository paymentRepository, IAccountsService accountsService, IReservationsService reservationsService)
        {
            _paymentRepository = paymentRepository;
            _accountsService = accountsService;
            _reservationsService = reservationsService;
        }

        public Payment AddPayment(Payment payment)
        {
            setPaymentFields(payment);
            _paymentRepository.AddPayment(payment);
            return payment;
        }
        private void setPaymentFields(Payment payment)
        {
            WorkerAccount w = _accountsService.GetWorkerAccount(payment.WorkerAccount.Id);
            if(w == null)
            {
                throw new InvalidForeignKeyException("Invalid workerAccountId");
            }
            Reservation r = _reservationsService.GetReservation(payment.Reservation.Id);
            if(r == null)
            {
                throw new InvalidForeignKeyException("Invalid reservationId");
            }
            payment.WorkerAccount = w;
            payment.Reservation = r;
        }

        public bool DeletePayment(string id)
        {
           return _paymentRepository.DeletePayment(id) > 0;
        }

        public Payment GetPayment(string id)
        {
            return _paymentRepository.GetPayment(id);
        }

        public List<Payment> GetPayments()
        {
            return _paymentRepository.GetPayments();
        }

        public bool UpdatePayment(Payment payment)
        {
            Payment p = _paymentRepository.GetPayment(payment.Id);
            if (p == null)
            {
                return false;
            }
            return _paymentRepository.UpdatePayment(payment);
        }
    }
}
