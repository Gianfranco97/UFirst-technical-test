import type { NextApiRequest, NextApiResponse } from "next";
import type { DashboardData } from "features/dashboard/types";
import { getEpaData } from "features/dashboard/utils/getEpaData";

export default function dashboardAPI(
  _: NextApiRequest,
  res: NextApiResponse<DashboardData>
) {
  const result = getEpaData();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  res.status(200).json(result);
}
