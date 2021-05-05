using FluentValidation;
using ReservationSystem.dtos;

namespace ReservationSystem.validators
{
    public class TableCreationDtoValidator: AbstractValidator<TableCreationDto>
    {
        public TableCreationDtoValidator()
        {
            RuleFor(x => x.Code).NotNull();
            RuleFor(x => x.NumberOfPeople).NotNull();
            RuleFor(x => x.IsActive).NotNull();

        }
    }
}
