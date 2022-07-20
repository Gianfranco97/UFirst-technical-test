import type { RequestMethodsAndCodes } from "features/dashboard/types";

export const transformDistributionToRecordData = (
  initialObject: RequestMethodsAndCodes
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
