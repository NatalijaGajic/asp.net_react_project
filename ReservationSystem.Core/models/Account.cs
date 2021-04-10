using MongoDB.Bson.Serialization.Attributes;


namespace ReservationSystem.Core.models
{
    public class Account
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Telephone { get; set; }
        public SystemRole Role { get; set; }
        public string AccountType { get; set; }
    }
}
