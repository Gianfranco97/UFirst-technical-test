import { expect } from "@jest/globals";
import { transformDateToTimestamp } from "../transformDateToTimestamp";

it("Get timestamp correctly", () => {
  const timestamp = transformDateToTimestamp({
    day: "29",
    hour: "10",
    minute: "25",
    second: "59",
  });

  expect(timestamp).toStrictEqual(-2206531157000);
});
