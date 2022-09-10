export const ADAPI = new Array(8).fill('').map((_, index) => ({
  id: index + 1,
  crew: 'G1',
  name: 'B01 RG Kaunas',
  status: 'online',
  inBreak: !!(index % 2).toString(),
  inTask: !(index % 2).toString(),
  askForBreak: 'active',
  dislocation: 'true',
  dislocationStatus: 'Į degalinę',
  connection: 'Prarastas rišys',
  address: 'Vilnius, A goštauto g. 7',
  event: 'Įvykis: spindulio nr N sabotažas'
}));

export const ATAPI = new Array(8).fill('').map((_, index) => ({
  id: index + 1,
  crew: (index + 1) * 10,
  name: 'B01 RG Kaunas',
  status: 'online',
  inBreak: 'true',
  inTask: 'false',
  askForBreak: 'active',
  dislocation: 'true',
  dislocationStatus: 'Į degalinę',
  connection: 'Vardenis Pavardenis',
  address: 'Vilnius, A goštauto g. 7',
  distance: `${Math.trunc(Math.random() * (index + 100))/10}`
}));
