using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string FirstAndLastName { get; set; }
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public byte Hours { get; set; }
        public byte NumberOfPeople { get; set; }
        public bool IsCancelled { get; set; }
        //TODO: Not all fields of account, only account info
        public Account Account { get; set; }
        public Game Game { get; set; }
        public Table Table { get; set; }
        public string WorkDayId { get; set; }

    }
}
