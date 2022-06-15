const HeaderBetween = props => (
  <header className="flex w-full justify-between p-6">
    <Breadcrumbs>
      <Breadcrumbs.Item>Objektai</Breadcrumbs.Item>
      <Breadcrumbs.Item>Visi duomenys</Breadcrumbs.Item>
    </Breadcrumbs>

    <SearchInputGroup />
  </header>
);

export default HeaderBetween;
