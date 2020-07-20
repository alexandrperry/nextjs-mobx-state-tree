import { getSnapshot } from 'mobx-state-tree';
import { RootInstance, rootStore } from 'store';
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

const Ssg: React.FC<RootInstance['autoSearch']> = ({ data }) => (
  <Layout>
    <Typography.Title>Static rendering</Typography.Title>
    <Divider />
    <Table dataSource={data} columns={columns} />
  </Layout>
);

export default Ssg;

export async function getStaticProps() {
  await rootStore.autoSearch.fetch('ba');

  return { props: getSnapshot(rootStore.autoSearch) };
}
