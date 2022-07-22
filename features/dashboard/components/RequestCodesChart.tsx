import { useMemo } from "react";
import { Bar } from '@ant-design/plots';
import { Card } from 'antd';
import { transformDistributionToRecordData } from "features/dashboard/utils/transformDistributionToRecordData";
import type { RequestDistribution } from "features/dashboard/types";

type Props = {
  distributionRequestCodes: RequestDistribution
};

function RequestCodesChart({ distributionRequestCodes }: Props) {
  const recordsDistributionRequestCodes = useMemo(() => {
    return transformDistributionToRecordData(distributionRequestCodes)
  }, [distributionRequestCodes])

  return (
    <Card title="Distribution request methods">
      <Bar
        data={recordsDistributionRequestCodes}
        xField='value'
        yField='type'
        yAxis={{
          label: {
            formatter: (text: string) => {
              return `Code: ${text}`
            }
          }
        }}
        tooltip={{
          title: (title: string) => {
            return `Code: ${title}`;
          },
          formatter: (record: any) => {
            return { name: "Total requests", value: record.value };
          },
        }}
      />
    </Card>
  );
};

export default RequestCodesChart;
