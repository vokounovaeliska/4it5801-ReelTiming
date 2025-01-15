export interface Timesheet {
  claimed_overtime: number;
  projectUser: {
    rate?: {
      standard_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
      compensation_rate: number;
    };
  };
  car?: {
    kilometer_allow?: number;
    kilometer_rate?: number;
  };
  kilometers?: number;
}

export const statementUtil = {
  calculateStatementDetails(statement: Timesheet) {
    const { rate } = statement.projectUser;
    const claimedOvertime = statement.claimed_overtime;
    const standardRate = rate?.standard_rate ?? 0;
    const kilometerAllow = statement.car?.kilometer_allow ?? 0;
    const kilometerRate = statement.car?.kilometer_rate ?? 0;
    const kilometers = statement.kilometers ?? 0;
    let overtime = claimedOvertime;
    let overtimeAmount = 0;

    if (statement?.projectUser?.rate) {
      if (overtime > 0) {
        overtimeAmount += statement.projectUser.rate?.overtime_hour1;
        overtime -= 1;
      }
      if (overtime > 0) {
        overtimeAmount += statement.projectUser.rate?.overtime_hour2;
        overtime -= 1;
      }
      if (overtime > 0) {
        overtimeAmount += statement.projectUser.rate.overtime_hour3;
        overtime -= 1;
      }
      if (overtime > 0) {
        overtimeAmount += statement.projectUser.rate.overtime_hour4 * overtime;
      }
    }

    const kilometersOver =
      kilometers > kilometerAllow ? kilometers - kilometerAllow : 0;
    const kilometerSum = kilometersOver * kilometerRate;

    const totalCost = standardRate + overtimeAmount + kilometerSum;

    return {
      overtimeAmount,
      kilometersOver,
      kilometerSum,
      totalCost,
      standardRate,
      claimedOvertime,
    };
  },
};
