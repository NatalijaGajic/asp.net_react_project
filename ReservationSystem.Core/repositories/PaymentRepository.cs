using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly IMongoCollection<Payment> _payments;

        public PaymentRepository(IDBClient dbClient)
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
            _payments.ReplaceOne(p => p.Id == payment.Id, payment);
            return payment;
        }
    }
}
