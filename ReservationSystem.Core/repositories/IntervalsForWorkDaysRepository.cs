using MongoDB.Driver;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class IntervalsForWorkDaysRepository : IIntervalsForWorkDaysRepository
    {
        private readonly IMongoCollection<IntervalsForWorkDay> _intervalsForWorkDays;

        public IntervalsForWorkDaysRepository(IDBClient dbClient)
        {
            _intervalsForWorkDays = dbClient.GetIntervalsForWorkDaysCollection();
        }
        public IntervalsForWorkDay GetIntervalsForWorkDay(string id)
        {
            return _intervalsForWorkDays.Find(i => i.Id == id).First();
        }

        public List<IntervalsForWorkDay> GetIntervalsForWorkDays()
        {
            return _intervalsForWorkDays.Find(i => true).ToList();

        }

        public IntervalsForWorkDay GetIntervalsForWorkDayByWorkDayId(String workDayId)
        {
            return _intervalsForWorkDays.Find(i => i.WorkDayId == workDayId).FirstOrDefault();
        }
    }
}

