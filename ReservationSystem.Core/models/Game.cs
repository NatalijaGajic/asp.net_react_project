using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ReservationSystem.Core
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Valute { get; set; }
        public byte NumberOfPlayers { get; set; }
        public bool IsActive { get; set; }
        public string ImageName { get; set; }


        public override bool Equals(Object obj)
        {
            if (obj.GetType() == this.GetType())
            {
                Game game = (Game)obj;
                return this.Id.Equals(game.Id);
            }
            return false;
        }

        public override int GetHashCode()
        {
            return 0;
        }
    }
}
