import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const EPA_FILE_PATH = "./public/epa-http.txt";

type EpaData = {
  host: string;
  datetime: {
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
  request: {
    method: string;
    url: string;
    protocol: string;
    protocol_version: string;
  };
  response_code: string;
  document_size: string;
};

export type RequestMethodsAndCodes = {
  [key: string]: number;
};

export interface IDashboardData {
  data: Array<EpaData>;
  statistics: {
    totalRequest: number;
    totalInvalidRequest: number;
    totalRequestPerMinute: number;
    totalCorrectAnswersLight: number;
    distributionRequestMethods: RequestMethodsAndCodes;
    distributionRequestCodes: RequestMethodsAndCodes;
  };
}

export const getEpaData = (): IDashboardData => {
  const result: Array<EpaData> = [];

  const dir = path.resolve(EPA_FILE_PATH);
  const allFileContents = fs.readFileSync(dir, "utf-8");

  let totalInvalidRequest = 0;
  let totalCorrectAnswersLight = 0;
  const requestMethods: RequestMethodsAndCodes = {};
  const requestCodes: RequestMethodsAndCodes = {};

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
      totalCorrectAnswersLight += 1;
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

  const firstTimestamp = new Date(
    null,
    null,
    firstValue.datetime.day,
    firstValue.datetime.hour,
    firstValue.datetime.minute,
    firstValue.datetime.second
  ).getTime();
  const latsTimestamp = new Date(
    null,
    null,
    lastValue.datetime.day,
    lastValue.datetime.hour,
    lastValue.datetime.minute,
    lastValue.datetime.second
  ).getTime();

  const totalRequest = result.length;
  const totalMinutes = Math.abs(firstTimestamp - latsTimestamp) / 1000 / 60;
  const totalRequestPerMinute = Math.ceil(totalRequest / totalMinutes);

  return {
    data: result,
    statistics: {
      totalRequest,
      totalInvalidRequest,
      totalRequestPerMinute,
      totalCorrectAnswersLight,
      distributionRequestMethods: requestMethods,
      distributionRequestCodes: requestCodes,
    },
  };
};

export default function dashboardAPI(
  req: NextApiRequest,
  res: NextApiResponse<IDashboardData>
) {
  const result = getEpaData();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  res.status(200).json(result);
}
