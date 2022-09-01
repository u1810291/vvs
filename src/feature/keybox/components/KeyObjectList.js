import Button from 'components/Button'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next';
import {useKeyObjects, useKeyObjectBox} from '../api';
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
import InputGroup from 'components/atom/input/InputGroup';
import {KeyBoxEditRoute} from '../routes';
import {generatePath} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import ComboBox from 'components/atom/input/ComboBox';



const displayValue = mapper => pipe(
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)

const onChange = ({set}) => ({value}) => set(value);

const KeyObjectList = ({boxId, assignRef, removeRef}) => {

  const {t: tp} = useTranslation('keybox');
  const {t: tf} = useTranslation('keybox', {keyPrefix: 'form'});
  const {t: ts} = useTranslation('keybox', {keyPrefix: 'status'});
  const {t} = useTranslation('keybox', {keyPrefix: 'list.column'});
  const nav = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const fetcher = useKeyObjects({filters: {id: boxId}});
  const list = fetcher?.data || [];
  const objects = useObjects({filters: {}});

  const toggleModal = (e) => {
    setShowModal(() => !showModal);
  }

  const formData = {
    set_name: FORM_FIELD.TEXT({label: tf`set_name`, validator: () => true}),
    object_id: FORM_FIELD.TEXT({label: tf`object_id`, validator: () => true}),
    box_id: FORM_FIELD.TEXT({label: '', initial: boxId, validator: () => true}),
  };

  const {ctrl, result, form, setForm} = useResultForm(formData);

  const resetPage = () => {
    // reset form
    const resetForm = {...form};
    resetForm['set_name'] = '';
    resetForm['object_id'] = '';
    setForm(resetForm);
    
    // refetch
    fetcher.mutate();
  }

  // 
  const assign = () => {
    isFunction(assignRef.current) && assignRef.current();
    toggleModal();
    resetPage();
  };

  const remove = (e) => { 
    if (!confirm('Are you sure you want to delete?')) return;
    
    isFunction(removeRef.current) && removeRef.current({box_id: boxId, key_id: e.target.id});
    resetPage();
  }
  
  // assign key + object to box
  useKeyObjectBox({
    formResult: result,
    setForm,
    saveRef: assignRef,
    removeRef: removeRef,
    successRedirectPath: generatePath(KeyBoxEditRoute.props.path, {id: boxId}),
  })


  return (
    <div className='flex flex-col w-4/6 p-6'>
      <div className='flex flex-row justify-between'>
        <h2>{tp`Objects`}</h2>
        <Button.Xs className='w-fit' onClick={toggleModal}>{tp`Assign object`}</Button.Xs>
      </div>

      <Table className='mt-2 w-full'>
        <Table.Head>
          <Table.Tr>
            <Table.Th>{t`Nr`}</Table.Th>
            <Table.Th>{t`Object nr.`}</Table.Th>
            <Table.Th>{t`Object`}</Table.Th>
            <Table.Th>{t`Address`}</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {list.map((r, index) => (
            <Table.Tr key={r.id}>
              <Table.Td>{r.key.set_name}</Table.Td>
              <Table.Td>{r.object.contract_object_no}</Table.Td>
              <Table.Td>{r.object.name}</Table.Td>
              <Table.Td>
                {r.object.address}
                <Nullable on={r.object.city}>, {titleCase(r.object.city)}</Nullable>  
              </Table.Td>
              <Table.Td>
                <Button.NoBg id={r.key.id} onClick={remove} className={'text-red-500 text-xs shadow-none'}>{tf`Delete`}</Button.NoBg>
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
              <InputGroup className={'w-1/2'} inputClassName={'h-[32px]'} {...ctrl('set_name')} />

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

export default KeyObjectList;