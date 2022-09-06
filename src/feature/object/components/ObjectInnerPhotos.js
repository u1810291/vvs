import Button from 'components/Button';
import {useAuth} from 'context/auth';
import {useNotification} from 'feature/ui-notifications/context';
import raw from 'raw.macro';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';
import {flip, identity} from 'crocks';
import {useTranslation} from 'react-i18next';
import InnerPhoto from './InnerPhoto';



const ObjectInnerPhotos = ({objectId, form, mutate}) => {
  const {t} = useTranslation('object', {keyPrefix: 'edit'});

  const auth = useAuth();
  const _uploadImage = flip(auth.api)(raw('../api/graphql/UploadImage.graphql'));
  const _removeImage = flip(auth.api)(raw('../api/graphql/RemoveImage.graphql'));
  const {notify} = useNotification();

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const uploadImage = () => {
    document.getElementById('chooseImage').click();
  }

  const onFileChoose = (event) => {
    const file = event.target.files[0];

    getBase64(file, (result) => {
      _uploadImage({object_id: objectId, src: result}).fork((error) => {
        notify(
          <NotificationSimple
            Icon={XCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
            heading={t`apiError`}
          >
            {errorToText(identity, error)}
          </NotificationSimple>
        )
      }, () => {
        notify(
          <NotificationSimple
            Icon={CheckCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
            heading={t`success`}
            />
        );

        mutate();
      });
    })
  }

  const removeImage = (e) => {
    if (!confirm('Are you sure you want to delete?')) return;
  
    _removeImage({id: e.target.id}).fork((error) => {
      notify(
        <NotificationSimple
          Icon={XCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
          heading={t`apiError`}
        >
          {errorToText(identity, error)}
        </NotificationSimple>
      )
    }, () => {
      notify(
        <NotificationSimple
          Icon={CheckCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
          heading={t`success`}
          />
      );

      mutate();
    })
  }

  return (
    <div className='p-6 flex flex-col space-y-8 w-1/2'>
      <h2 className='font-bold text-xl'>{t('object_photos')}</h2>

      <div className='grid grid-cols-4 gap-4'>
        {form['images']?.map(img => (
          <InnerPhoto id={img.id} key={img.id} img={img} removeImage={removeImage} />
        ))}
      </div>

      <div className='flex justify-end w-full'>
        <input
          id='chooseImage'
          type='file'
          name='image'
          onChange={onFileChoose}
          hidden={true}
        />
        <Button.Nd onClick={uploadImage}>{t('upload_photo')}</Button.Nd>
      </div>
    </div>        
  );
}

export default ObjectInnerPhotos;