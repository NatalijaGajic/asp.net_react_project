using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class ClientAccountDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Telephone { get; set; }
        public SystemRole Role { get; set; }
        public string AccountType { get; set; }
        public byte Penalty { get; set; }
        public DateTime DateOfLastPenalty { get; set; }
    }
}
