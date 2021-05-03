using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public interface IIntervalsForWorkDaysRepository
    {
        List<IntervalsForWorkDay> GetIntervalsForWorkDays();
        //TODO: Trigger add intervals for a work day (on WorkDay insert)
        //Or add intervals when WorkDaySchema is changed (on WorkDay update)
        //IntervalsForWorkDay AddIntervalsForWorkDay(IntervalsForWorkDay intervalsForWorkDay);
        IntervalsForWorkDay GetIntervalsForWorkDay(string id);
        //TODO: Trigger delete intervals if IsWorkDay is set from true to false (on WorkDay update)
        //or WorkDaySchema is changed (before deletion check if there are reservations)
        //void DeleteIntervalsForWorkDay(string id);
        //TODO: Trigger update intervals if reservation is made or canceled (on Reservation insert/update)
        //IntervalsForWorkDay UpdateIntervalsForWorkDay(IntervalsForWorkDay intervalsForWorkDay);
    }
}
