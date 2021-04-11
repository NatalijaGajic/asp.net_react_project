using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class PaymentService : IPaymentService
    {
        private readonly IMongoCollection<Payment> _payments;

        public PaymentService(IDBClient dbClient)
        {
            _payments = dbClient.GetPaymentsCollection();
        }

        public Payment AddPayment(Payment payment)
        {
            _payments.InsertOne(payment);
            return payment;
        }

        public void DeletePayment(string id)
        {
            _payments.DeleteOne(p => p.Id == id);
        }

        public Payment GetPayment(string id)
        {
            return _payments.Find(p => p.Id == id).First();
        }

        public List<Payment> GetPayments()
        {
            return _payments.Find(p => true).ToList();
        }

        public Payment UpdatePayment(Payment payment)
        {
            GetPayment(payment.Id);
            _payments.ReplaceOne(p => p.Id == payment.Id, payment);
            return payment;
        }
    }
}
