import React, {
  useState,
  useContext,
  useCallback,
} from 'react';
import useLanguage from '../../hook/useLanguage';
import {DislocationHeader} from '../../components/headers/dislocation/dislocationHeader';
import {DislocationsHeader} from '../../components/headers/dislocation/dislocations';
import DislocationSide from '../../components/sides/dislocationSide';
import DislocationSideToArchive from '../../components/sides/dislocationSideToArchive';
import GlobalContext from '../../context/globalContext';
import {OverlayProvider, usePreventScroll} from 'react-aria';
import SlideOver from '../../components/sidebars/slideOver';
import MainSidebar from '../../components/sidebars/main';
import Map from '../../feature/map/component/Map';
import GoogleMapTools from '../../feature/map/component/GoogleMapTools';
import {Polygon} from '@react-google-maps/api';
import {generate} from 'shortid';
import {useGoogleApiContext} from '../../context/googleApiContext';

function Dislocation() {
  const {accessToken} = useContext(AuthContext);
  const {onMapLoad, setValue, libraries, isLoaded} = useGoogleApiContext();
  const {expandFilterDislocations, setExpandFilterDislocations} =
    useContext(GlobalContext);
  const {selectedFilterDislocations, setSelectedFilterDislocations} =
    useContext(GlobalContext);
  const {filterListDislocations, setFilterListDislocations} =
    useContext(GlobalContext);
  const {polygonsData, setPolygonsData} = useContext(GlobalContext);
  const {removeZone, setRemoveZone} = useContext(GlobalContext);
  const {addressCrew, setAddressCrew} = useContext(GlobalContext);
  const {polygonsCoordinates, setPolygonsCoordinates} =
    useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const {english, lithuanian, t} = useLanguage();
  const preventScroll = usePreventScroll({isDisabled: !isOpen});
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const options = {
    fillColor: 'lightblue',
    fillOpacity: 1,
    strokeColor: 'red',
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  const crewZonesVariables = {
    updateCrewZones: {
      name: addressCrew,
      nodes: polygonsCoordinates,
    },
  };

  const {
    error: errorResponse,
    data: mutateResponse,
    loading: loadingResponse,
    fetchData,
  } = {error: null, data: null, loading: false, fetchData: () => {}}

  const createNewPolygon = useCallback(() => {
    fetchData();
    setRemoveZone(false);
  }, [fetchData, setRemoveZone]);

  return (
    <OverlayProvider>
      <div className='container max-w-screen-xl'>
        <div className='flex w-screen flex-row justify-center h-screen'>
          <div className='flex flex-col h-full items-center w-full'>
            <div className='flex flex-row w-full justify-between h-full'>
              <div className='flex flex-col bg-slate-600 pt-6 items-center w-20'>
                <button className='flex flex-col items-center py-2 text-gray-400'>
                  <img
                    alt='hamburger'
                    onClick={handleOnOpen}
                    className='w-4 h-4 mx-16'
                    src={require('../../assets/assets/hamburger.png')}
                  />
                </button>
                <img
                  alt='line'
                  className='pt-1'
                  src={require('../../assets/assets/Line.png')}
                ></img>
                {filterListDislocations.map((filter) => {
                  if (filter.savedToMenu === true) {
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilterDislocations(filter.id)}
                        className={
                          selectedFilterDislocations === filter.id
                            ? 'font-light text-md mt-6 text-white'
                            : 'font-light text-md mt-6 text-gray-400 hover:text-white'
                        }
                      >
                        {filter.filterShortName}
                      </button>
                    );
                  }
                })}
              </div>
              <div className='flex flex-col min-h-full w-full justify-between'>
                {!removeZone ? <DislocationsHeader /> : null}
                {removeZone ? (
                  <DislocationHeader fetch={createNewPolygon} />
                ) : null}
                <div className='flex flex-row min-h-screen sm:min-h-0 sm:h-full'>
                  <div className='flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-2/6'>
                    {!removeZone ? <DislocationSide /> : null}
                    {removeZone ? <DislocationSideToArchive /> : null}
                  </div>
                  <Map>
                    {libraries && <GoogleMapTools onMapLoad={onMapLoad} />}
                    {polygonsData.map((polygon, index) => (
                      <Polygon
                        onLoad={onMapLoad}
                        paths={polygon.nodes}
                        options={options}
                        key={generate()}
                      />
                    ))}
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SlideOver isOpen={isOpen} onClose={handleOnClose}>
          <MainSidebar />
        </SlideOver>
      </div>
    </OverlayProvider>
  );
}

export default Dislocation;
