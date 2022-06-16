import SidebarLayout from '../../layout/sidebarLayout';
import SearchInputGroup from '../../components/InputGroup/SearchInputGroup';
import Breadcrumbs from '../../components/Breadcrumbs';
import Table from '../../components/Table';
import Filter from '../../components/Filter';

const Objects = props => {
  return (
    <SidebarLayout>

      <TitleBar>
        <div className='md:flex md:space-x-4 md:space-y-0 space-y-4'>

          <Breadcrumbs>
            <Breadcrumbs.Item><span className='font-semibold'>Objektai</span></Breadcrumbs.Item>
            <Breadcrumbs.Item>Visi duomenys</Breadcrumbs.Item>
          </Breadcrumbs>

          <SearchInputGroup />

        </div>
      </TitleBar>

      <Filter onValues={console.log}>
        <Filter.Item propPath='vienas.veins'>vienas</Filter.Item>
        <Filter.Item propPath='du.duu'>du</Filter.Item>
      </Filter>

      <Table>
        <Table.Head>
          <Table.Tr>
            <Table.Th>Hey</Table.Th>
            <Table.Th>Hey</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          <Table.Tr>
            <Table.Td>Hey</Table.Td>
            <Table.Td>Hey</Table.Td>
          </Table.Tr>
        </Table.Body>
      </Table>

    </SidebarLayout>
  );
}

const TitleBar = props => (
  <header className='flex w-full justify-between p-6'>
    {props?.children}
  </header>
);


export default Objects;
