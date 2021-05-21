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

        public int DeletePayment(string id)
        {
            DeleteResult res = _payments.DeleteOne(p => p.Id == id);
            return (int)res.DeletedCount;
        }

        public Payment GetPayment(string id)
        {
            return _payments.Find(p => p.Id == id).FirstOrDefault();
        }

        public List<Payment> GetPayments()
        {
            return _payments.Find(p => true).ToList();
        }

        public bool UpdatePayment(Payment payment)
        {
            ReplaceOneResult res = _payments.ReplaceOne(p => p.Id == payment.Id, payment);
            return res.MatchedCount > 0;
        }
    }
}
