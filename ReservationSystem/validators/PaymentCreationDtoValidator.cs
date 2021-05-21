using FluentValidation;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Validators
{
    public class PaymentCreationDtoValidator: AbstractValidator<PaymentCreationDto>
    {
        public PaymentCreationDtoValidator()
        {
            //TODO: Custom check with utils function if ids are in the right format
            RuleFor(x => x.WorkerAccountId).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty().GreaterThan(0);
            RuleFor(x => x.Valute).NotNull().NotEmpty();
            RuleFor(x => x.ReservationId).NotNull().NotEmpty();
            RuleFor(x => x.WorkerAccountId).Must(id => CheckIdHelpper.CheckId(id)).WithMessage("WorkerAccountId is not a valid 24 digit hex string");
            RuleFor(x => x.ReservationId).Must(id => CheckIdHelpper.CheckId(id)).WithMessage("ReservationId is not a valid 24 digit hex string");

        }
    }
}
