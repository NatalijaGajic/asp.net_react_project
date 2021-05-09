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
    public class SystemRoleProfile: Profile
    {
        public SystemRoleProfile()
        {
            CreateMap<SystemRole, SystemRoleDto>();
            CreateMap<SystemRoleCreationDto, SystemRole>();
            CreateMap<SystemRoleUpdateDto, SystemRole>();
        }
    }
}
