export type EpaDateTime = {
  day: string;
  hour: string;
  minute: string;
  second: string;
};

export type EpaData = {
  host: string;
  datetime: EpaDateTime;
  request: {
    method: string;
    url: string;
    protocol: string;
    protocol_version: string;
  };
  response_code: string;
  document_size: string;
};

export type RequestDistribution = {
  [key: string]: number;
};

export type DashboardData = {
  data: Array<EpaData>;
  statistics: {
    totalRequest: number;
    totalInvalidRequest: number;
    totalRequestPerMinute: number;
    distributionRequestMethods: RequestDistribution;
    distributionRequestCodes: RequestDistribution;
    distributionRequestSizes: RequestDistribution;
  };
};
