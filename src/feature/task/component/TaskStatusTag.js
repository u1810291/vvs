import {caseMap} from '@s-e/frontend/flow-control';
import {pipe, getProp, curry, option, chain, safe, constant, map, isString, isSame} from 'crocks';
import Tag from 'components/atom/Tag';
import withPreparedProps from 'hoc/withPreparedProps';
import {useTranslation} from 'react-i18next';

const lensCase = (lens, pred) => pipe(
  lens,
  chain(safe(isString)),
  map(String),
  map(a => a.toUpperCase()),
  chain(safe(pred)),
  map(constant(true)),
  option(false)
);

/**
* @type {(
*   statusLens: object => any, 
*   ) => (
*   onNew: (obj: object) => any,
*   oncancelled: (obj: object) => any,
*   onOnRoad: (obj: object) => any,
*   onInspection: (obj: object) => any,
*   onInspectionDone: (obj: object) => any,
*   onFinished: (obj: object) => any,
*   onWaitForApproval: (obj: object) => any,
*   onUnknown: (obj: object) => any,
*   props: (obj: object),
* ) => any}
*/
const getStatus = curry(
  (
    statusLens,
    onNew,
    oncancelled,
    onOnRoad,
    onInspection,
    onInspectionDone,
    onFinished,
    onWaitForApproval,
    onUnknown,
    props
  ) => caseMap(onUnknown, [
      [lensCase(statusLens, isSame('CANCELLED')), oncancelled],
      [lensCase(statusLens, isSame('NEW')), onNew],
      [lensCase(statusLens, isSame('WAIT_FOR_APPROVAL')), onWaitForApproval],
      [lensCase(statusLens, isSame('ON_THE_ROAD')), onOnRoad],
      [lensCase(statusLens, isSame('INSPECTION')), onInspection],
      [lensCase(statusLens, isSame('INSPECTION_DONE')), onInspectionDone],
      [lensCase(statusLens, isSame('FINISHED')), onFinished],
    ], props)
);

const UntranslatedTaskStatusTag = ({
  lens = {
    /**
     * @type {(obj: Object) => boolean}
     */
    status: getProp('status'),
  },
  classNames = {
    new: 'bg-curious',
    finished: 'bg-mantis',
    onRoad: 'bg-brick',
    cancelled: 'bg-oxford',
    inspection: 'bg-brick',
    inspectionDone: 'bg-tango',
    waitForApproval: 'bg-tango',
    unknown: 'bg-gray-600',
  },
  getText = {
    new: constant('new'),
    cancelled: constant('cancelled'),
    onRoad: constant('on road'),
    inspection: constant('inspection'),
    inspectionDone: constant('inspection done'),
    finished: constant('finished'),
    waitForApproval: constant('wait for approval'),
    unknown: constant('unknown'),
  },
  Component = Tag,
  ...props
} = {}) => {
  const _getStatus = getStatus(lens.status);

  return (
    <Component className={
      pipe(
        _getStatus(
          constant(classNames.new),
          constant(classNames.cancelled),
          constant(classNames.onRoad),
          constant(classNames.inspection),
          constant(classNames.inspectionDone),
          constant(classNames.finished),
          constant(classNames.waitForApproval),
          constant(classNames.unknown),
        ),
        status => [status, props?.className].join(' '),
      )(props)
    }>
      {pipe(_getStatus(
        getText.new,
        getText.cancelled,
        getText.onRoad,
        getText.inspection,
        getText.inspectionDone,
        getText.finished,
        getText.waitForApproval,
        getText.unknown,
        ))(props)}
    </Component>
  );
};

const TaskStatusTag = withPreparedProps(UntranslatedTaskStatusTag, () => {
  const {t} = useTranslation('task', {keyPrefix: 'status'});

  return {
    getText: {
      new: constant(t('new')),
      cancelled: constant(t('cancelled')),
      onRoad: constant(t('onRoad')),
      inspection: constant(t('inspection')),
      inspectionDone: constant(t('inspectionDone')),
      finished: constant(t('finished')),
      waitForApproval: constant(t('waitForApproval')),
      unknown: constant(t('unknown')),
    }
  };
});

TaskStatusTag.Untranslated = UntranslatedTaskStatusTag;

TaskStatusTag.Xs = withPreparedProps(TaskStatusTag, constant({
  Component: Tag.Xs,
}));

TaskStatusTag.Sm = withPreparedProps(TaskStatusTag, constant({
  Component: Tag.Sm,
}));

TaskStatusTag.Lg = withPreparedProps(TaskStatusTag, constant({
  Component: Tag.Lg,
}));

TaskStatusTag.Xl = withPreparedProps(TaskStatusTag, constant({
  Component: Tag.Xl,
}));

export default TaskStatusTag;
