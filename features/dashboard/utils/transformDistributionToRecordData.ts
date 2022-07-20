import type { RequestDistribution } from "features/dashboard/types";

export const transformDistributionToRecordData = (
  initialObject: RequestDistribution
) => {
  const data: Record<string, any>[] = [];

  for (const key in initialObject) {
    if (Object.prototype.hasOwnProperty.call(initialObject, key)) {
      data.push({
        type: key,
        value: initialObject[key],
      });
    }
  }

  return data;
};
