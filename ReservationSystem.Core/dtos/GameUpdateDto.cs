using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class GameUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string Valute { get; set; }
        public int NumberOfPlayers { get; set; }
        public bool IsActive { get; set; }
        public string ImageName { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
