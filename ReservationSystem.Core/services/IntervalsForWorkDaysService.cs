using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System.Collections.Generic;

namespace ReservationSystem.Core.services
{
    public class IntervalsForWorkDaysService : IIntervalsForWorkDaysService
    {
        private readonly IIntervalsForWorkDaysRepository _intervalsForWorkDaysRepository;

        public IntervalsForWorkDaysService(IIntervalsForWorkDaysRepository intervalsForWorkDaysRepository)
        {
            _intervalsForWorkDaysRepository = intervalsForWorkDaysRepository;
        }
        public IntervalsForWorkDay GetIntervalsForWorkDay(string id)
        {
            return _intervalsForWorkDaysRepository.GetIntervalsForWorkDay(id);
        }

        public List<IntervalsForWorkDay> GetIntervalsForWorkDays()
        {
            return _intervalsForWorkDaysRepository.GetIntervalsForWorkDays();

        }
    }
}

