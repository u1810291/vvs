import {XCircleIcon} from '@heroicons/react/solid';
import {useTranslation} from 'react-i18next';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from './NotificationSimple';

const ErrorNotification = props => {
  const {t} = useTranslation();
  return (
    <NotificationSimple
      Icon={XCircleIcon}
      iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
      heading={t`error`}
      {...props}
    />
  )
};

export default ErrorNotification;
