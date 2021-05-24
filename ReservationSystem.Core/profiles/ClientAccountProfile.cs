using AutoMapper;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.profiles
{
    public class ClientAccountProfile: Profile
    {
        public ClientAccountProfile()
        {
            CreateMap<ClientAccountCreationDto, ClientAccount>();
            CreateMap<ClientAccountUpdateDto, ClientAccount>();
            CreateMap<ClientAccount, ClientAccountDto>();
        }
    }
}
