import Button from 'components/Button'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next';

import {
  chain,
  getProp,
  isEmpty,
  map,
  not,
  pipe,
  safe,
  option,
  constant,
  isFunction,
  identity,
  isSame,
  // maybeToAsync,
} from 'crocks';
import Table from 'components/Table';
import Modal from 'components/atom/Modal';
import Nullable from 'components/atom/Nullable';
// import SelectBox from 'components/atom/input/SelectBox';
import useResultForm from 'hook/useResultForm';
import {FORM_FIELD} from 'hook/useResultForm';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useObjects} from 'feature/object/api';
// import {ClientEditRoute} from '../routes';
// import {generatePath} from 'react-router-dom';
import {generatePath, useNavigate} from 'react-router-dom';
import ComboBox from 'components/atom/input/ComboBox';
import useClientObjects from '../api/useClientObjects';
import useClientObject from '../api/useClientObject';
import {ClientEditRoute} from '../routes';
import {caseMap} from '@s-e/frontend/flow-control';



const displayValue = mapper => pipe(
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)

const onChange = ({set}) => ({value}) => set(value);

const ClientObjectList = ({userId, assignRef, removeRef}) => {

  const {t: tp} = useTranslation('client');
  const {t: tf} = useTranslation('client', {keyPrefix: 'form'});
  const {t: ts} = useTranslation('client', {keyPrefix: 'status'});
  const {t} = useTranslation('client', {keyPrefix: 'list.column'});
  const nav = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const fetcher = useClientObjects({filters: {id: userId}});
  const list = fetcher?.data || [];
  const objects = useObjects({filters: {}});

  const toggleModal = (e) => {
    setShowModal(() => !showModal);
  }

  const formData = {
    object_id: FORM_FIELD.TEXT({label: tf`object_id`, validator: () => true}),
    user_id: FORM_FIELD.TEXT({label: '', initial: userId, validator: () => true}),
  };

  const {ctrl, result, form, setForm} = useResultForm(formData);
  const resetPage = () => {
    // reset form
    const resetForm = {...form};
    resetForm['object_id'] = '';
    setForm(resetForm);
    // refetch
    fetcher.mutate();
  }
  // 
  const assign = () => {
    isFunction(assignRef.current) && assignRef.current(() => {
      resetPage();
    });
    toggleModal();
  };

  const remove = (e) => { 
    if (!confirm('Are you sure you want to delete?')) return;
    isFunction(removeRef.current) && removeRef.current({user_id: userId, object_id: e.target.id}, () => {
      resetPage();
    });
    
  }
  
  // assign client + object to box
  useClientObject({
    formResult: result,
    setForm,
    saveRef: assignRef,
    removeRef: removeRef,
    successRedirectPath: userId && generatePath(ClientEditRoute.props.path, {id: userId}),
    errorMapper: caseMap(identity, [
      [isSame('invalid input syntax for type uuid: ""'), constant(t('error.clientWasNotCreated'))]
    ]),
  })
  const showObjectModal = () => {
    const theForm = {...form};
    theForm['user_id'] = userId;
    setForm(theForm);
    toggleModal();
  }
  return (
    <div className='flex flex-col w-4/6 p-6'>
      <div className='flex flex-row justify-between'>
        <h2>{tp`Objects`}</h2>
        <Button.Xs className='w-fit' onClick={showObjectModal}>{tp`Assign object`}</Button.Xs>
      </div>

      <Table className='mt-2 w-full'>
        <Table.Head>
          <Table.Tr>
            <Table.Th>{t`Nr`}</Table.Th>
            <Table.Th>{t`Object`}</Table.Th>
            <Table.Th>{t`Address`}</Table.Th>
            <Table.Th>{t`Contract nr.`}</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {list.map((r, index) => (
            <Table.Tr key={r.object.id}>
              <Table.Td>{r.object.contract_object_no}</Table.Td>
              <Table.Td>{r.object.name}</Table.Td>
              <Table.Td>
                {r.object.address}
                <Nullable on={r.object.city}>, {titleCase(r.object.city)}</Nullable>  
              </Table.Td>
              <Table.Td>{r.object.contract_no}</Table.Td>
              <Table.Td>
                <Button.NoBg id={r.object.id} onClick={remove} className={'text-red-500 text-xs shadow-none'}>{tf`Delete`}</Button.NoBg>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>

      <Nullable on={showModal}>
        <Modal 
          title={tp`Assign an object`}
          setOpen={toggleModal}
        >
          <div className='flex flex-col'>
            {/* <h3>Assign an Object</h3> */}
            <div className='w-full flex flex-row space-x-2'>
              <ComboBox 
                className={'w-1/2'} 
                labelText={tf('object')}
                multiple={false}
                placeholder={'Search [Single choice]'}
                {...ctrl('object_id')} 
                value={form['object_id']}
                data-id={form['object_id']}
                displayValue={v => objects?.data?.find(o => o.id === v)?.name}
                onChange={(v) => {
                  const theForm = {...form};
                  theForm['object_id'] = v;
                  setForm(theForm);
                }}
              >
                {map(object => (
                  <ComboBox.Option key={object.id} value={object.id}>
                    {titleCase(object.name || object.id)}
                  </ComboBox.Option>
                ), (objects?.data || []))}
              </ComboBox>
            </div>
            <div className={'flex justify-end mt-10 space-x-4'}>
              <Button.NoBg onClick={toggleModal} className={'text-gray-300'}>{tf`Cancel`}</Button.NoBg>
              <Button.Xs onClick={assign} className={'px-6'}>{tf`Save`}</Button.Xs>
            </div>
          </div>
        </Modal>
      </Nullable>
    </div>
  )
}

export default ClientObjectList;