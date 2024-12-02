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
  calculateOvertimeAmount(statement: Timesheet): number {
    let overtime = statement.claimed_overtime;
    let totalOvertimeAmount = 0;

    if (!statement.projectUser.rate) return totalOvertimeAmount;

    if (overtime > 0) {
      totalOvertimeAmount += statement.projectUser.rate?.overtime_hour1;
      overtime -= 1;
    }
    if (overtime > 0) {
      totalOvertimeAmount += statement.projectUser.rate?.overtime_hour2;
      overtime -= 1;
    }
    if (overtime > 0) {
      totalOvertimeAmount += statement.projectUser.rate.overtime_hour3;
      overtime -= 1;
    }
    if (overtime > 0) {
      totalOvertimeAmount +=
        statement.projectUser.rate.overtime_hour4 * overtime;
    }

    return totalOvertimeAmount;
  },

  calculateKilometersOver(statement: Timesheet): number | null {
    const allow = statement.car?.kilometer_allow ?? 0;
    const kilometers = statement.kilometers ?? 0;

    if (
      statement.car?.kilometer_allow === null ||
      statement.car?.kilometer_allow === undefined ||
      !statement.kilometers
    )
      return null;

    if (allow >= kilometers) {
      return 0;
    } else {
      return kilometers - allow;
    }
  },

  calculateKilometerSum(statement: Timesheet): number | null {
    const over = statementUtil.calculateKilometersOver(statement);
    const rate = statement.car?.kilometer_rate ?? 0;

    if (over == null || !rate) return null;

    if (over === 0) {
      return 0;
    } else {
      return over * rate;
    }
  },
};
