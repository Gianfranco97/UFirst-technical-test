import { expect } from "@jest/globals";
import { getEpaData } from "../getEpaData";

jest.mock("constants/config", () => ({
  EPA_FILE_PATH: "epa-http-test.txt",
}));

const EXPECTED_VALUE = {
  data: [
    {
      datetime: { day: "30", hour: "00", minute: "33", second: "20" },
      document_size: "0",
      host: "archives.math.utk.edu",
      request: {
        method: "HEAD",
        protocol: "HTTP",
        protocol_version: '1.0"',
        url: "/nep/nep.html",
      },
      response_code: "200",
    },
    {
      datetime: { day: "30", hour: "08", minute: "31", second: "53" },
      document_size: "-",
      host: "therese-anderson.umewmp.maine.edu",
      request: {
        method: "GET",
        protocol: "HTTP",
        protocol_version: '1.0"',
        url: "/cgi-bin/xl_left.gif",
      },
      response_code: "404",
    },
    {
      datetime: { day: "30", hour: "08", minute: "31", second: "54" },
      document_size: "231",
      host: "r3opm007.r3opm.epa.gov",
      request: {
        method: "GET",
        protocol: "HTTP",
        protocol_version: '1.0"',
        url: "/icons/ok2-0.gif",
      },
      response_code: "200",
    },
    {
      datetime: { day: "30", hour: "16", minute: "14", second: "42" },
      document_size: "26771",
      host: "denver.carl.org",
      request: {
        method: "POST",
        protocol: "HTTP",
        protocol_version: '1.0"',
        url: "/cgi-bin/waisgate/134.67.99.11=earth1=210=/usr1/comwais/indexes/HTDOCS=gopher%40earth1=0.00=:free",
      },
      response_code: "200",
    },
  ],
  statistics: {
    distributionRequestCodes: { "200": 3, "404": 1 },
    distributionRequestMethods: { GET: 2, HEAD: 1, POST: 1 },
    distributionRequestSizes: { "0": 1, "231": 1 },
    totalInvalidRequest: 1,
    totalRequest: 4,
    totalRequestPerMinute: 1,
  },
};

describe("getEpaData", () => {
  const epaData = getEpaData();

  it("Get totalRequest correctly", () => {
    expect(epaData.statistics.totalRequest).toStrictEqual(
      EXPECTED_VALUE.statistics.totalRequest
    );
  });

  it("Get totalInvalidRequest correctly", () => {
    expect(epaData.statistics.totalInvalidRequest).toStrictEqual(
      EXPECTED_VALUE.statistics.totalInvalidRequest
    );
  });

  it("Get totalRequestPerMinute correctly", () => {
    expect(epaData.statistics.totalRequestPerMinute).toStrictEqual(
      EXPECTED_VALUE.statistics.totalRequestPerMinute
    );
  });

  it("Get distributionRequestMethods correctly", () => {
    expect(epaData.statistics.distributionRequestMethods).toStrictEqual(
      EXPECTED_VALUE.statistics.distributionRequestMethods
    );
  });

  it("Get distributionRequestCodes correctly", () => {
    expect(epaData.statistics.distributionRequestCodes).toStrictEqual(
      EXPECTED_VALUE.statistics.distributionRequestCodes
    );
  });

  it("Get distributionRequestSizes correctly", () => {
    expect(epaData.statistics.distributionRequestSizes).toStrictEqual(
      EXPECTED_VALUE.statistics.distributionRequestSizes
    );
  });

  it("Get epaData correctly", () => {
    expect(epaData.data).toStrictEqual(EXPECTED_VALUE.data);
  });
});
