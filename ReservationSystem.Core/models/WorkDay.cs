using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class WorkDay
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }

        //indicates to driver to convert the time to local time from UTC when deserailsing the BSON back to POCO.
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)] 
        public DateTime Date { get; set; }
        public bool IsWorkDay { get; set; }
        public WorkDayScheme WorkDayScheme { get; set; }

    }
}
