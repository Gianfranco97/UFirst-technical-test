import type { NextPage } from "next";
import MainLayout from "components/MainLayout";
import { getEpaData } from "features/dashboard/utils/getEpaData";
import RequestMethodsChart from "features/dashboard/components/RequestMethodsChart";
import RequestCodesChart from "features/dashboard/components/RequestCodesChart";
import type { DashboardData } from "features/dashboard/types";
import GeneralStatistic from "features/dashboard/components/GeneralStatistic";
import RequestSizesChart from "features/dashboard/components/RequestSizesChart";
import { Col, Row } from "antd";

type Props = {
  epaData?: DashboardData | null;
};

const Home: NextPage<Props> = ({ epaData }) => {
  return (
    <MainLayout>
      <Row justify="center">
        <Col xs={24} >
          <GeneralStatistic
            totalRequest={epaData?.statistics.totalRequest}
            totalInvalidRequest={epaData?.statistics.totalInvalidRequest}
            totalRequestPerMinute={epaData?.statistics.totalRequestPerMinute}
          />
        </Col>

        <Col xs={24} md={12}>
          <RequestMethodsChart
            distributionRequestMethods={epaData?.statistics?.distributionRequestMethods ?? {}}
          />
        </Col>

        <Col xs={24} md={12}>
          <RequestCodesChart
            distributionRequestCodes={epaData?.statistics?.distributionRequestCodes ?? {}}
          />
        </Col>

        <Col xs={24}>
          <RequestSizesChart
            distributionRequestSizes={epaData?.statistics?.distributionRequestSizes ?? {}}
          />
        </Col>
      </Row>
    </MainLayout >
  );
};

export async function getServerSideProps() {
  return ({ props: { epaData: getEpaData() } });
}

export default Home;
