import { useMemo } from "react";
import { Card } from 'antd';
import { Pie } from '@ant-design/plots';
import { transformDistributionToRecordData } from "features/dashboard/utils/transformDistributionToRecordData";
import type { RequestDistribution } from "features/dashboard/types";

type Props = {
  distributionRequestMethods: RequestDistribution
};

function RequestMethodsChart({ distributionRequestMethods }: Props) {
  const recordsDistributionRequestMethods = useMemo(() => {
    return transformDistributionToRecordData(distributionRequestMethods)
  }, [distributionRequestMethods])

  return (
    <Card
      title="Distribution request codes"
    >
      <Pie
        data={recordsDistributionRequestMethods}
        angleField='value'
        colorField='type'
        radius={0.8}
        label={{ content: '{name} {percentage}' }}
        legend={{
          itemValue: {
            formatter: (text: string) => {
              return `- ${distributionRequestMethods[text]}`
            }
          }
        }}
      />
    </Card>
  );
};

export default RequestMethodsChart;
