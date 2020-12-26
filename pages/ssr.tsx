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

const Ssr: React.FC<RootInstance['autoSearch'] & { time: string }> = ({
  data,
  time
}) => (
  <Layout>
    <Typography.Title>
      Server-side rendering at
      {time}
    </Typography.Title>
    <Divider />
    <Table dataSource={data} columns={columns} />
  </Layout>
);

export default Ssr;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader('Cache-Control', `s-maxage=1, stale-while-revalidate`);
  await rootStore.autoSearch.fetch('pa');
  return {
    props: {
      ...getSnapshot(rootStore.autoSearch),
      time: new Date().toLocaleString()
    }
  };
}
