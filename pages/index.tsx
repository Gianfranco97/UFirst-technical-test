import type { NextPage } from "next";
import MainLayout from "components/MainLayout";
import { getEpaData } from "features/dashboard/utils/getEpaData";
import RequestMethodsChart from "features/dashboard/components/RequestMethodsChart";
import RequestCodesChart from "features/dashboard/components/RequestCodesChart";
import type { DashboardData } from "features/dashboard/types";

type Props = {
  epaData?: DashboardData | null;
};

const Home: NextPage<Props> = ({ epaData }) => {
  return (
    <MainLayout>
      <RequestMethodsChart
        distributionRequestMethods={epaData?.statistics?.distributionRequestMethods ?? {}}
      />

      <RequestCodesChart
        distributionRequestCodes={epaData?.statistics?.distributionRequestCodes ?? {}}
      />
    </MainLayout>
  );
};

export async function getServerSideProps() {
  return ({ props: { epaData: getEpaData() } });
}

export default Home;
