import React, { useCallback, useMemo } from 'react'
import { FormGroup, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import confirm from 'reactstrap-confirm'
import { formatter } from '../../../utils'
import * as yup from 'yup'

import * as actions from '../../../actions/finance.actions'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import {useTranslation} from "react-i18next";


function MoneyTransferModal() {
  const { t } = useTranslation('common');

  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.finance.modals.transfer)
  const isLoading = useSelector((state) => state.finance.loadings.transfer)
  const validationSchema = yup.object({
    username: yup.string().required(`${t('private.MoneyTrans.username')}`),
    password: yup.string().required(`${t('private.MoneyTrans.username')}`),
    amount: yup
      .number()
      .typeError(`${t('private.MoneyTrans.typeError')}`)
      .positive(`${t('private.MoneyTrans.positive')}`)
      .required(`${t('private.MoneyTrans.required')}`),
  })

  const submitTransferMoneyForm = async ({ username, amount, password }) => {
    let result = await confirm({
      title: `${t('private.MoneyTrans.result.title')}  ${username}`,
      message: `${t('private.MoneyTrans.result.message')} ${formatter.format(amount).replace('₽', 'RUB')} ${t('private.MoneyTrans.partner')} "${username}"`,
      confirmText: `${t('private.MoneyTrans.result.confirmText')}`,
      confirmColor: 'primary',
      cancelText: `${t('private.MoneyTrans.result.cancelText')}`,
      cancelColor: 'link text-muted',
    })

    if (result) {
      const payload = { username, password, amount: Number(amount) }
      dispatch(actions.transferMoney(payload))
    }
  }

  const initialValues = useMemo(
    () => isVisible && { username: '', amount: '', password: '' },
    [isVisible],
  )

  const handleCloseModal = useCallback(() => {
    dispatch(actions.toggleTransferMoneyModal(false))
  }, [dispatch])

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitTransferMoneyForm}
    >
      {({ isValid, dirty }) => (
        <Modal keyboard={false} backdrop="static" isOpen={isVisible} toggle={handleCloseModal}>
          <Form>
            <ModalHeader toggle={handleCloseModal}>
              {t('private.MoneyTrans.title')}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Field type="text" name="amount" placeholder={t('private.MoneyTrans.placeholder')} component={Input} />
              </FormGroup>
              <FormGroup>
                <Field type="text" name="username" placeholder={t('private.MoneyTrans.placeholder2')} component={Input} />
              </FormGroup>
              <FormGroup>
                <Field
                  type="password"
                  name="password"
                  placeholder={t('private.MoneyTrans.placeholder3')}
                  component={Input}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={!(isValid && dirty) || isLoading}
                loading={isLoading}
                block
              >
                {t('private.MoneyTrans.submit')}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  )
}

export default MoneyTransferModal
