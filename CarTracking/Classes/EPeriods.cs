using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarTracking
{
    public enum EPeriods
    {
        CurrentJourney = 1,
        LastJourney,
        Last12Hours,
        Last24Hours,
        Yesterday,
        CustomPeriod
    }
}