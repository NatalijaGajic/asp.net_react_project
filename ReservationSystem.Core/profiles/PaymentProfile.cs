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
            CreateMap<PaymentCreationDto, Payment>();
            CreateMap<PaymentUpdateDto, Payment>();

        }
    }
}
