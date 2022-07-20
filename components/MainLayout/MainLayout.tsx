import { Layout } from 'antd';
import styles from "./MainLayout.module.scss"

type DashboardLayoutProps = {
  children: React.ReactNode,
};

export default function MainLayout({ children }: DashboardLayoutProps) {
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}><h1>Technical test - UFirst</h1></Layout.Header>

      <Layout>
        <Layout.Content className={styles.main}>{children}</Layout.Content>
      </Layout>

      <Layout.Footer className={styles.footer}>© 2022 - Gianfranco Manganiello</Layout.Footer>
    </Layout>
  )
}