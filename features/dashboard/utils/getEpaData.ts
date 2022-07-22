import fs from "fs";
import path from "path";
import type {
  EpaData,
  DashboardData,
  RequestDistribution,
} from "features/dashboard/types";
import { EPA_FILE_PATH } from "constants/config";
import { transformDateToTimestamp } from "./transformDateToTimestamp";

export const getEpaData = (): DashboardData => {
  const result: Array<EpaData> = [];

  const file = path.join(process.cwd(), "files", EPA_FILE_PATH);
  const allFileContents = fs.readFileSync(file, "utf-8");

  let totalInvalidRequest = 0;
  const requestMethods: RequestDistribution = {};
  const requestCodes: RequestDistribution = {};
  const requestSizes: RequestDistribution = {};

  allFileContents.split(/\r?\n/).forEach((line: string) => {
    if (!line) {
      return;
    }

    const separatedLine = line.replace('"', "").split(" ");

    if (separatedLine.length < 6) {
      totalInvalidRequest += 1;
      return;
    }

    const host = separatedLine[0];
    const [day, hour, minute, second] = separatedLine[1]
      .replace(/[\[\]]/g, "")
      .split(":");
    const method = separatedLine[2];
    const url = separatedLine[3];
    const [protocol, protocol_version] = separatedLine[4].split("/");
    const response_code = separatedLine[separatedLine.length - 2];
    const document_size = separatedLine[separatedLine.length - 1];

    requestMethods[method] = (requestMethods[method] || 0) + 1;
    requestCodes[response_code] = (requestCodes[response_code] || 0) + 1;

    if (response_code === "200" && Number(document_size) < 1000) {
      requestSizes[document_size] = (requestSizes[document_size] || 0) + 1;
    }

    result.push({
      host,
      datetime: {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
      },
      request: {
        method,
        url,
        protocol,
        protocol_version,
      },
      response_code,
      document_size,
    });
  });

  // Request per minute
  const firstValue = result[0];
  const lastValue = result[result.length - 1];

  const firstTimestamp = transformDateToTimestamp(firstValue.datetime);
  const latsTimestamp = transformDateToTimestamp(lastValue.datetime);

  const totalRequest = result.length;
  const totalMinutes = Math.abs(firstTimestamp - latsTimestamp) / 1000 / 60;
  const totalRequestPerMinute = Math.ceil(totalRequest / totalMinutes);

  return {
    data: result,
    statistics: {
      totalRequest,
      totalInvalidRequest,
      totalRequestPerMinute,
      distributionRequestMethods: requestMethods,
      distributionRequestCodes: requestCodes,
      distributionRequestSizes: requestSizes,
    },
  };
};
