import { Spin } from 'antd';
import MainLayout from 'components/MainLayout';
import styles from "./LoadingFullPage.module.scss"

export default function LoadingFullPage() {
  return (
    <MainLayout>
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    </MainLayout>
  )
}