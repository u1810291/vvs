import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { FinishedHeader } from '../components/headers/finished';
import NewSideLeft from '../components/sides/newSideLeft';
import InProcessRightSide from '../components/sides/inProcessRight';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import GlobalContext from '../context/globalContext';
import SlideOver from '../components/sidebars/slideOver';
import { OverlayProvider, usePreventScroll } from 'react-aria';
import MainSidebar from '../components/sidebars/main';
import useUtils from '../hook/useUtils';

function New() {
  const { pdfExportComponentNew } = useContext(GlobalContext);
  const { toPrintNew, setToPrintNew } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setIsOpen(false);

  usePreventScroll({ isDisabled: !isOpen });
  const { backFunc } = useUtils();

  return (
      <OverlayProvider>
        <div className='container max-w-screen-xl'>
          <div className='flex w-screen flex-row justify-center h-screen'>
            <div className='flex flex-col h-full items-center w-full'>
              <div className='flex flex-row w-full justify-between h-full'>

              <div className='flex flex-col bg-slate-600 pt-6 items-center w-20'>
                <button onClick={backFunc}>
                  <img src={require('../assets/assets/left.png')}></img>
                </button>
                <img
                  className='pt-6'
                  src={require('../assets/assets/Line.png')}
                ></img>
                <button className='flex flex-col items-center pt-2'>
                  <img
                    onClick={() => setIsOpen(true)}
                    className='w-4 h-4 mx-16'
                    src={require('../assets/assets/hamburger.png')}
                  />
                </button>
              </div>
              <div className='flex flex-col h-full w-full'>
                {/* <NewHeader /> */}
                {/* <InProcessHeader /> */}
                <FinishedHeader />
                <div className='flex flex-row w-full justify-between h-full'>
                  {toPrintNew ? (
                    <PDFExport
                      ref={pdfExportComponentNew}
                      scale={0.4}
                      paperSize='A4'
                      margin='1cm'
                    >
                      <div className='container max-w-screen-xl'>
                        <div className='flex w-screen flex-row justify-center h-screen'>
                          <div className='flex flex-col h-full items-center w-full'>
                            <div className='flex flex-row w-full justify-between h-full'>
                              <div className='flex flex-col h-full w-full'>
                                <div className='flex flex-row w-full justify-between h-full'>
                                  <div className='flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100'>
                                    <InProcessRightSide />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PDFExport>
                  ) : (
                    <>
                      <div className='flex min-h-full overflow-y-auto scrollbar-gone flex-col w-2/4 bg-gray-100'>
                        <NewSideLeft />
                      </div>
                      <div className='flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100'>
                        <InProcessRightSide />
                        {/* <NewSideRight/> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>
              <SlideOver isOpen={isOpen} onClose={handleOnClose}>
                <MainSidebar />
              </SlideOver>
            </div>
          </div>
        </div>
      </OverlayProvider>
  );
}

export default New;
