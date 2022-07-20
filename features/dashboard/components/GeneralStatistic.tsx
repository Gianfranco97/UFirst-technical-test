import { Card, Statistic, Row, Col } from 'antd';

type Props = {
  totalRequest?: number,
  totalInvalidRequest?: number,
  totalRequestPerMinute?: number
};

function GeneralStatistic({ totalRequest, totalInvalidRequest, totalRequestPerMinute }: Props) {
  return (
    <Card title="General statistic">
      <Row gutter={[8, 24]}>
        <Col span={8}>
          <Statistic
            title="Total request"
            value={totalRequest}
            loading={!totalRequest}
          />
        </Col>

        <Col span={8}>
          <Statistic
            title="Total request per minute"
            value={totalRequestPerMinute}
            loading={!totalRequestPerMinute}
          />
        </Col>

        <Col span={8}>
          <Statistic
            title="Invalid request"
            value={totalInvalidRequest}
            loading={!totalInvalidRequest}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default GeneralStatistic;
