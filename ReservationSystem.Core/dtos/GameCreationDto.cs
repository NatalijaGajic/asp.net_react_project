using System;


namespace ReservationSystem.Core.dtos
{
    public class GameCreationDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Valute { get; set; }
        public int NumberOfPlayers { get; set; }
        public bool IsActive { get; set; }
    }
}
