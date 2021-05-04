using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class Table
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public byte NumberOfPeople { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }

        public override bool Equals(Object obj)
        {
            if(obj.GetType() == this.GetType())
            {
                Table table = (Table)obj;
                return this.Id.Equals(table.Id);
            }
            return false;
        }

        public override int GetHashCode()
        {
            return 0;
        }
    }
}
