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
            CreateMap<Game, GameDto>()
                .ForMember(dest => dest.ImagePath,
                opt => opt.MapFrom((src, dst, _, context) => context.Options.Items["ImagePath"]));
            CreateMap<GameUpdateDto, Game>();
        }

    }
}
