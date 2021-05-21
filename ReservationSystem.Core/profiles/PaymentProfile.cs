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
    class PaymentProfile: Profile
    {
        public PaymentProfile()
        {
            CreateMap<Payment, PaymentDto>();
            CreateMap<PaymentCreationDto, Payment>().ForPath(
                dest => dest.Reservation.Id,
                opt => opt.MapFrom(src => $"{src.ReservationId}")).ForPath(
                dest => dest.WorkerAccount.Id,
                opt => opt.MapFrom(src => $"{src.WorkerAccountId}"));
            CreateMap<PaymentUpdateDto, Payment>();

        }
    }
}
