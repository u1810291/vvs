import React from "react";
import {
  FocusScope,
  OverlayContainer,
  useOverlay,
  useModal,
  useDialog,
} from "react-aria";
import { motion, AnimatePresence } from "framer-motion";

const opacity_0 = { opacity: 0 };
const opacity_1 = { opacity: 1 };
const initial_100 = { x: "-100%" };
const animate_0 = { x: 0 };
const transitionEase = { ease: "easeInOut", duration: 0.5 };

function SlideOverContent(props) {
  const { onClose, children, title } = props;

  const ref = React.useRef();
  const { overlayProps } = useOverlay(props, ref);
  const { modalProps } = useModal(props, ref);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 bottom-0 left-20 bg-slate-600 bg-opacity-100 transition-opacity"
          aria-hidden="true"
          initial={opacity_0}
          animate={opacity_1}
          exit={opacity_0}
        ></motion.div>
        <motion.section
          className="absolute inset-y-0 left-[4rem] pr-10 max-w-full flex"
          aria-labelledby="slide-over-heading"
          ref={ref}
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          initial={initial_100}
          animate={animate_0}
          exit={initial_100}
          transition={transitionEase}
        >
          <FocusScope contain restoreFocus autoFocus>
            <div className="relative w-screen max-w-md">
              <div className="absolute top-0 left-0 -mr-8 pt-4 pl-2 flex sm:ml-36 sm:pl-80">
              </div>
              <div className="h-full flex flex-col pb-6 bg-slate-600 scrollbar-gone overflow-y-scroll">
                <div className="px-4 sm:px-6">
                  <h2
                    id="slide-over-heading"
                    className="text-lg font-medium text-gray-900"
                    {...titleProps}
                  >
                    {title}
                  </h2>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  {children}
                </div>
              </div>
            </div>
          </FocusScope>
        </motion.section>
      </div>
    </div>
  );
}

function SlideOver({ isOpen, onClose, title, children }) {
  return (
    <OverlayContainer>
      <AnimatePresence>
        {isOpen && (
          <SlideOverContent onClose={onClose} isOpen={isOpen} isDismissable>
            {children}
          </SlideOverContent>
        )}
      </AnimatePresence>
    </OverlayContainer>
  );
}

export default SlideOver;
