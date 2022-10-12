import {withMergedClassName} from 'util/react';

const TailwindUiPrimary = props => (
  <button
    type='button'
    className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-oxford focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    {...props}
  />
);

const TailwindUiSecondary = props => (
  <button
    type='button'
    className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-geyser focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    {...props}
  />
);


const TailwindUiDanger = props => (
  <button
    type='button'
    className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-geyser focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    {...props}
  />
);

const CLASS_NAME_PRIMARY = 'inline-flex items-center justify-center border border-transparent loading-none font-medium rounded-sm shadow-sm text-white bg-oxford hover:bg-oxford-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxford';
const CLASS_NAME_SECONDARY = 'inline-flex items-center justify-center border border-transparent loading-none font-medium rounded-sm shadow-sm text-regent bg-geyser hover:bg-geyser-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxford';
const CLASS_NAME_DANGER = 'inline-flex items-center justify-center border border-transparent loading-none font-medium rounded-sm shadow-sm text-white bg-brick hover:bg-brick-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxford';
const CLASS_NAME_NO_BG = 'inline-flex items-center justify-center loading-none font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxford';

// TODO: Imporove Button logic with Secondary etc. types

const Button = withMergedClassName(`${CLASS_NAME_PRIMARY} px-2 py-2 text-base`, TailwindUiPrimary);

Button.Sm = withMergedClassName(`${CLASS_NAME_PRIMARY} px-2 py-2 text-sm`, TailwindUiPrimary);
Button.Xs = withMergedClassName(`${CLASS_NAME_PRIMARY} bg-gray-500 px-3 py-2 text-sm`, TailwindUiPrimary);
Button.Xxs = withMergedClassName(`${CLASS_NAME_PRIMARY} px-2.5 py-1.5 text-xs`, TailwindUiPrimary);

Button.Nd = Button.Xxs = withMergedClassName(`${CLASS_NAME_PRIMARY} bg-gray-500 px-2 py-2 text-base`, TailwindUiPrimary);
Button.NoBg = Button.Xxs = withMergedClassName(`${CLASS_NAME_NO_BG} px-2 py-2 text-base`, TailwindUiPrimary);

Button.Primary = withMergedClassName(`${CLASS_NAME_PRIMARY} px-2 py-2 text-base`, TailwindUiPrimary);
Button.Secondary = withMergedClassName(`${CLASS_NAME_SECONDARY} px-2 py-2 text-base`, TailwindUiSecondary);
Button.Danger = withMergedClassName(`${CLASS_NAME_SECONDARY} px-2 py-2 text-base`, TailwindUiSecondary);

Button.Pxl = Button.Primary = withMergedClassName(`${CLASS_NAME_PRIMARY} px-16 py-4 text-base`, TailwindUiPrimary);
Button.Sxl = Button.Secondary = withMergedClassName(`${CLASS_NAME_SECONDARY} px-16 py-4 text-base`, TailwindUiSecondary);
Button.Dxl = Button.Danger = withMergedClassName(`${CLASS_NAME_DANGER} px-16 py-4 text-base`, TailwindUiDanger);


export default Button;
