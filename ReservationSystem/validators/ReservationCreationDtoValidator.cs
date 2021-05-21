using FluentValidation;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.Utils;
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
            //TODO: validator validates fields in order thet are sent in request body
            // objects arent null nor empty if they are passed as {} validation should be better
            RuleFor(x => x.FirstAndLastName).NotNull().NotEmpty();
            RuleFor(x => x.Account).NotNull().NotEmpty();
            //RuleFor(x => x.Account.Id).Must(id => id!=null && CheckIdHelpper.CheckId(id)).WithMessage("AccountId is not a valid 24 digit hex string"); //working
            RuleFor(x => x.EndHour).NotNull().GreaterThan(0).LessThan(24);
            RuleFor(x => x.StartHour).NotNull().GreaterThan(0).LessThan(24);
            RuleFor(x => x.Table).NotNull().NotEmpty();
            RuleFor(x => x.Game).NotNull().NotEmpty();
        }
    }
}
