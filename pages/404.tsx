import { Result, Button } from 'antd';
import Link from 'next/link';
import MainLayout from 'components/MainLayout';

function MissingPage() {
  return (
    <MainLayout>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Button type="primary">
            <Link href="/">Back to home</Link>
          </Button>
        )}
      />
    </MainLayout>
  );
}

export default MissingPage;
