import { expect } from "@jest/globals";
import { transformDistributionToRecordData } from "../transformDistributionToRecordData";

it("Get recordData correctly", () => {
  const recordData = transformDistributionToRecordData({ a: 12, b: 34 });

  expect(recordData).toStrictEqual([
    { type: "a", value: 12 },
    { type: "b", value: 34 },
  ]);
});
