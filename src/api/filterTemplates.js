export const filterTemplates = [
  {
    id: generate(),
    filterName: generate(),
    filterShortName: Math.random().toString(36).slice(-4),
    savedToFavorite: false,
    savedToMenu: false,
    date: new Date().toISOString(),
    optionsList : {
      operator: '0',
      object: '0',
      objectAddress: '',
      type: '0',
      group: '0',
      status: '0',
      reason: '0',
      crew: '0',
      driver: '0',
      inTime: '0'
    },
    dashboardList: {
      showDate: 'Gauta',
      showObject: 'Objektas',
      showName: 'Pavadinimas',
      showCrew: 'Ekipažas',
      showInTime: 'spėjo laiku',
      showReactionTime: 'Reagavimo laikas',
      showTimeInObject: 'Laikas objekte',
      showStatus: 'Būsena',
      showReason: 'Suveikimo priežastis'
    }
  },
];