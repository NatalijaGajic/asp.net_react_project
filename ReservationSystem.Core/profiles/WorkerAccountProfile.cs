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
    class WorkerAccountProfile : Profile
    {
        public WorkerAccountProfile()
        {
            CreateMap<WorkerAccountCreationDto, WorkerAccount>();
            CreateMap<WorkerAccountUpdateDto, WorkerAccount>();
            CreateMap<WorkerAccount, WorkerAccountDto>().ForMember(
                dest => dest.Role,
                opt => opt.MapFrom(src => $"{src.Role.Name}"));
        }
        
    }
}
