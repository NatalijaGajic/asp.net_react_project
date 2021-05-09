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
    public class ReservationProfile: Profile
    {
        public ReservationProfile()
        {
            CreateMap<Reservation, ReservationDto>();
            CreateMap<ReservationCreationDto, Reservation>();
            CreateMap<ReservationUpdateDto, Reservation>();


        }
    }
}
