using ReservationSystem.Core.models;
using System.Collections.Generic;


namespace ReservationSystem.Core.repositories
{
    public interface IPaymentRepository
    {
        List<Payment> GetPayments();
        Payment AddPayment(Payment payment);
        Payment GetPayment(string id);
        void DeletePayment(string id);
        Payment UpdatePayment(Payment payment);
    }
}
