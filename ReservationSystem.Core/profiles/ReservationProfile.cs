using AutoMapper;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using System.Collections.Generic;

namespace ReservationSystem.Core.profiles
{
    public class ReservationProfile: Profile
    {
        public ReservationProfile()
        {
            CreateMap<Reservation, ReservationDto>()
                .ForMember(x => x.workDay,
                opt => opt.MapFrom((src, dst, _, context) => context.Options.Items["workDay"]));
            CreateMap<ReservationCreationDto, Reservation>();
            CreateMap<ReservationUpdateDto, Reservation>();


        }

        
    }

}
