using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class Payment
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public decimal Price { get; set; }
        public string Valute { get; set; }
        public DateTime DateTime { get; set; }
        public WorkerAccount WorkerAccount { get; set; }
        public Reservation Reservation { get; set; }

    }
}
