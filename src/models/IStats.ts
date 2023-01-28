export interface IStats {
    totalClicksNumber: number;
    branchesNumber: number;
    branches: {
        [key: string]: {
            totalClicks: number;
            clicksToday: { [key: string]: number };
            clicksLastWeek: { [key: string]: number };
            clicksLastMonth: { [key: string]: number };
            clicksLast3Month: { [key: string]: number };
            clicksLastYear: { [key: string]: number };
        }
    }
}

export interface IStatsResponse {
    success: true;
    data: IStats;
}
