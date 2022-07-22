import { useMemo } from "react";
import { Card } from 'antd';
import { Column } from '@ant-design/plots';
import { transformDistributionToRecordData } from "features/dashboard/utils/transformDistributionToRecordData";
import type { RequestDistribution } from "features/dashboard/types";

type Props = {
  distributionRequestSizes: RequestDistribution
};

function RequestSizesChart({ distributionRequestSizes }: Props) {
  const recordsDistributionRequestSizes = useMemo(() => {
    return transformDistributionToRecordData(distributionRequestSizes)
  }, [distributionRequestSizes])

  return (
    <Card title="Distribution of requests with code 200 and size < 1000B">
      <Column
        data={recordsDistributionRequestSizes}
        xField='type'
        yField='value'
        xAxis={{
          label: {
            formatter: (text: string) => {
              return `${text} B`
            }
          }
        }}
        tooltip={{
          title: (title: string) => {
            return `${title} Bytes`;
          },
          formatter: (record: any) => {
            return { name: "Total requests", value: record.value };
          },
        }}
        slider={{
          start: 0,
          end: 1,
        }}
      />
    </Card>
  );
};

export default RequestSizesChart;
