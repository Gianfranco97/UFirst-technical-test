import { useMemo } from "react";
import { Bar } from '@ant-design/plots';
import { Card } from 'antd';
import { transformDistributionToRecordData } from "features/dashboard/utils/transformDistributionToRecordData";
import type { RequestMethodsAndCodes } from "features/dashboard/types";

type Props = {
  distributionRequestCodes: RequestMethodsAndCodes
};

function RequestCodesChart({ distributionRequestCodes }: Props) {
  const recordsDistributionRequestCodes = useMemo(() => {
    return transformDistributionToRecordData(distributionRequestCodes)
  }, [distributionRequestCodes])

  return (
    <Card title="Distribution request methods"
      style={{ maxWidth: 600 }}
    >
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
      />
    </Card>
  );
};

export default RequestCodesChart;
