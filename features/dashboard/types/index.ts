export type EpaData = {
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

export type DashboardData = {
  data: Array<EpaData>;
  statistics: {
    totalRequest: number;
    totalInvalidRequest: number;
    totalRequestPerMinute: number;
    totalCorrectAnswersLight: number;
    distributionRequestMethods: RequestMethodsAndCodes;
    distributionRequestCodes: RequestMethodsAndCodes;
  };
};
