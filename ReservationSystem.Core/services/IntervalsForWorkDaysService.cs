using ReservationSystem.Core.contracts;
using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System;
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

        public IntervalsForWorkDayReservationQueryParamsResponse GetIntervalsForWorkDayReservation(IntervalsForWorkDayReservationQueryParams queryParams)
        {
            String workDayId = queryParams.WorkDayId;
            String startHour = queryParams.StartHour;
            String endHour = queryParams.EndHour;
            String numberOfPeople = queryParams.NumberOfPeople;
            String gameId = queryParams.GameId;
            Dictionary<Table, int> tablesDict = new Dictionary<Table, int>();
            Dictionary<Game, int> gamesDict = new Dictionary<Game, int>();

            try
            {
                if (workDayId == null || startHour == null || endHour == null)
                {
                    throw new Exception("Bad query parameters, required params are missing");
                }

                IntervalsForWorkDay intervalsForWorkDay = _intervalsForWorkDaysRepository.GetIntervalsForWorkDayByWorkDayId(workDayId);
                if (intervalsForWorkDay == null)
                {
                    //No free intervals (it's not a work day)
                    throw new Exception("No intervals for a works day to show");
                }

                List<IntervalForWorkDay> freeTimeIntervals = intervalsForWorkDay.FreeTimeIntervals;
                if (freeTimeIntervals == null || freeTimeIntervals.Count == 0)
                {
                    throw new Exception("No free intervals to show");
                }

                //TODO: Start hour should be larger than workDay schema startHour, frontend 
                int s = Convert.ToInt32(startHour);
                int e = Convert.ToInt32(endHour);
                int hours = e - s;
                if (hours < 0 || hours > 3)
                {
                    throw new Exception("Wrong query params StartHour should be smaller than EndHour with max difference 3");
                }
                int i = 0;
                List<Table> freeTables;
                List<Game> freeGames;
                List<Table> tables = new List<Table>();
                List<Game> games = new List<Game>();
                foreach (IntervalForWorkDay interval in freeTimeIntervals)
                {
                    if (interval.StartHour >= s && interval.EndHour >= e)
                    {
                        // For one day game name, price and other fields will be the same in every list of games
                        // even when reservations are cancelled (if name price changes it will stay the same as it was
                        // when intervals were made (work day was inserted))
                        freeTables = interval.FreeTables;
                        freeGames = interval.FreeGames;
                            
                        if (i == 0)
                        {
                            InitializeTablesAndGamesDict(tablesDict, freeTables, gamesDict, freeGames, gameId);
                        }
                        else
                        {
                            GetTables(tablesDict, freeTables);
                            GetGames(gamesDict, freeGames, gameId);
                        }
                        i++;
                    }
                    if (i == hours)
                    {
                        break;
                    }
                } //foreach
                    
                GetFreeTables(tables, tablesDict, hours);
                if (tables.Count > 0)
                {
                    IntervalsForWorkDayReservationQueryParamsResponse response = new IntervalsForWorkDayReservationQueryParamsResponse();

                    if (gameId == null) //Reservation
                    {
                        GetFreeGames(games, gamesDict, hours);
                        response.Tables = tables;
                        response.Games = games;
                        return response;
                    }
                    else //GameReservation
                    {
                        foreach(KeyValuePair<Game, int> kvp in gamesDict)
                        {
                            if(kvp.Value == hours)
                            {
                                response.Tables = tables;
                                games.Add(kvp.Key);
                                response.Games = games;
                                return response;
                            }
                            else
                            {
                                throw new Exception("Game is not available");
                            }
                        }
                        //logically unreachable
                        throw new Exception("Game is not available");
                    }
                   
                }
                else
                {
                    //No free tables
                    throw new Exception("No free tables");
                }
            }
            catch (Exception e)
            {
                //TODO custom exception
                //Conversion not successfull or s>e
                throw new Exception(e.Message);
            }
        }



        private void GetFreeTables(List<Table> tables, Dictionary<Table, int> tablesDict, int hours)
        {
            foreach (KeyValuePair<Table, int> kvp in tablesDict)
            {
                if(kvp.Value == hours)
                {
                    tables.Add(kvp.Key);
                }
            }
        }
        private void GetFreeGames(List<Game> games, Dictionary<Game, int> gamesDict, int hours)
        {
            foreach (KeyValuePair<Game, int> kvp in gamesDict)
            {
                if (kvp.Value == hours)
                {
                    games.Add(kvp.Key);
                }
            }
        }

        private void GetGames(Dictionary<Game, int> dict, List<Game> games, String gameId)
        {
            if(gameId == null)
            {
                foreach (Game game in games)
                {
                    if (dict.ContainsKey(game))
                    {
                        dict[game] = dict[game] + 1;
                    }
                }
                return;
            }
            foreach (Game game in games)
            {
                if (dict.ContainsKey(game))
                {
                    dict[game] = dict[game] + 1;
                    break;
                }
            }

        }
        private void GetTables(Dictionary<Table, int> dict, List<Table> tables)
        {
            foreach (Table table in tables)
            {
                if (dict.ContainsKey(table))
                {
                    dict[table] = dict[table] + 1;
                }
            }
        }

        private void InitializeTablesAndGamesDict(Dictionary<Table, int> tablesDict, List<Table> freeTables, Dictionary<Game, int> gamesDict, List<Game> freeGames, String gameId)
        {
            foreach(Table table in freeTables)
            {
                tablesDict.Add(table, 1);
            }

            if (gameId != null)
            {
                foreach (Game game in freeGames)
                {
                    if (game.Id.Equals(gameId))
                    {
                        gamesDict.Add(game, 1);
                        break;
                    }
                }
                if(gamesDict.Count == 0)
                {
                    throw new Exception("Game is not available");

                }
                return;
            }

            foreach (Game game in freeGames)
            {
                gamesDict.Add(game, 1);
            }


        }

        public List<IntervalsForWorkDay> GetIntervalsForWorkDays()
        {
            return _intervalsForWorkDaysRepository.GetIntervalsForWorkDays();

        }

    }
}

