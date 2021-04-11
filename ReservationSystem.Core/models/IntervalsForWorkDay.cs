using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class IntervalsForWorkDay
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string WorkDayId { get; set; }

        public List<IntervalForWorkDay> FreeTimeIntervals { get; set; }

    }
}
