import Button from 'components/Button';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';






const InnerPhoto = ({img, removeImage}) => {
  const [isHovered, setHovered] = useState(false);
  const {t} = useTranslation('object', {keyPrefix: 'edit'});

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} key={img.id} className={'flex flex-col items-end'}>
      <Button.NoBg id={img.id} onClick={removeImage} className={`${isHovered ? 'visible' : 'invisible'} w-fit text-red-500`}>{t('delete')}</Button.NoBg>
      <img className='object-cover w-full h-48 border' src={img.src} />
    </div>
  );
}

export default InnerPhoto;