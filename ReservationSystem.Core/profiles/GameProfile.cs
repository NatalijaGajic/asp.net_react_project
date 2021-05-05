using AutoMapper;
using ReservationSystem.Core.dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.profiles
{
    public class GameProfile: Profile
    {
        public GameProfile()
        {
            CreateMap<GameCreationDto, Game>();
        }

    }
}
