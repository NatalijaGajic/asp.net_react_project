using FluentValidation;
using ReservationSystem.Core.dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Validators
{
    public class ReservationCreationDtoValidator: AbstractValidator<ReservationCreationDto>
    {
        public ReservationCreationDtoValidator()
        {
            RuleFor(x => x.FirstAndLastName).NotNull().NotEmpty();
            RuleFor(x => x.Account).NotNull();
            RuleFor(x => x.EndHour).NotNull().GreaterThan(0).LessThan(24);
            RuleFor(x => x.StartHour).NotNull().GreaterThan(0).LessThan(24);
            RuleFor(x => x.Table).NotNull();
            RuleFor(x => x.Game).NotNull(); 
        }
    }
}
