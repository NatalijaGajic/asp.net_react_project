using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class SystemRoleCreationDto
    {
        //TODO: name should be unique
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
