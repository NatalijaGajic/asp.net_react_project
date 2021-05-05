using FluentValidation;
using ReservationSystem.Core.dtos;

namespace ReservationSystem.validators
{
    public class GameCreationDtoValidator: AbstractValidator<GameCreationDto>
    {
        public GameCreationDtoValidator()
        {
            RuleFor(x => x.IsActive).NotNull();
            RuleFor(x => x.Description).NotNull().NotEmpty().MinimumLength(10).MaximumLength(300);
            RuleFor(x => x.Name).NotNull().NotEmpty().MinimumLength(3).MaximumLength(70);
            RuleFor(x => x.NumberOfPlayers).NotNull().GreaterThan(0);
            RuleFor(x => x.Price).NotNull().GreaterThan(0);
            RuleFor(x => x.Valute).NotNull().NotEmpty().MinimumLength(2);

        }
    }
}
