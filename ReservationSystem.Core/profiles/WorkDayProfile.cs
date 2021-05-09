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
    class WorkDayProfile: Profile
    {
        public WorkDayProfile()
        {
            CreateMap<WorkDay, WorkDayDto>();
            CreateMap<WorkDayCreationDto, WorkDay>();
            CreateMap<WorkDayUpdateDto, WorkDay>();
        }
    }
}
