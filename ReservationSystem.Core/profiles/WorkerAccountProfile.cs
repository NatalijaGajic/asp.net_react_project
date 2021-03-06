using AutoMapper;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;

namespace ReservationSystem.Core.profiles
{
    public class WorkerAccountProfile : Profile
    {
        public WorkerAccountProfile()
        {
            CreateMap<WorkerAccountCreationDto, WorkerAccount>();
            CreateMap<WorkerAccountUpdateDto, WorkerAccount>();
            CreateMap<WorkerAccount, WorkerAccountDto>();
        }
        
    }
}
