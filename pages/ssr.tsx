import { GetServerSidePropsContext } from 'next';
import { getSnapshot } from 'mobx-state-tree';
import { rootStore, RootInstance } from 'store';
import Layout from 'components/Layout';
import { Table, Typography, Divider } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'defaultName',
    key: 'defaultName'
  },
  {
    title: 'Country code',
    dataIndex: 'countryCode',
    key: 'countryCode'
  },
  {
    title: 'Population',
    dataIndex: 'population',
    key: 'population'
  }
];

const Ssr: React.FC<RootInstance['autoSearch']> = ({ data }) => (
  <Layout>
    <Typography.Title>Server-side rendering</Typography.Title>
    <Divider />
    <Table dataSource={data} columns={columns} />
  </Layout>
);

export default Ssr;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await rootStore.autoSearch.fetch('pa');
  ctx.res.setHeader('Cache-Control', `s-maxage=1, stale-while-revalidate`);
  return { props: getSnapshot(rootStore.autoSearch) };
}
