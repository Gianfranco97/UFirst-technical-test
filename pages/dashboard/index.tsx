import { useEffect, useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { Card } from 'antd';
import { Pie, Bar } from '@ant-design/plots';
import MainLayout from "components/MainLayout";
import { IDashboardData, getEpaData, RequestMethodsAndCodes } from "pages/api/dashboard";

type Props = {
  epaData?: IDashboardData | null;
};

const transformToRecordData = (initialObject: RequestMethodsAndCodes) => {
  const data: Record<string, any>[] = []

  for (const key in initialObject) {
    if (Object.prototype.hasOwnProperty.call(initialObject, key)) {
      data.push({
        type: key,
        value: initialObject[key],
      })
    }
  }

  return data
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => ({ props: { epaData: getEpaData() } });

const Home: NextPage<Props> = ({ epaData }) => {
  useEffect(() => {
    console.log("Gian holi", epaData);
  }, [epaData]);

  const distributionRequestMethods = useMemo(() => {
    return transformToRecordData(epaData?.statistics?.distributionRequestMethods ?? {})
  }, [epaData?.statistics?.distributionRequestMethods])

  const distributionDistributionRequestCodes = useMemo(() => {
    return transformToRecordData(epaData?.statistics?.distributionRequestCodes ?? {})
  }, [epaData?.statistics?.distributionRequestCodes])


  return (
    <MainLayout>
      <Card title="Distribution request methods"
        style={{ maxWidth: 600 }}
      >
        <Pie
          data={distributionRequestMethods}
          angleField='value'
          colorField='type'
          radius={0.8}
          label={{ content: '{name} {percentage}' }}
          legend={{
            itemValue: {
              formatter: (text: string) => {
                return `- ${epaData?.statistics.distributionRequestMethods[text]}`
              }
            }
          }}
        />
      </Card>

      <Card title="Distribution request codes"
        style={{ maxWidth: 600 }}
      >
        <Bar
          data={distributionDistributionRequestCodes}
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
    </MainLayout>
  );
};

export default Home;
