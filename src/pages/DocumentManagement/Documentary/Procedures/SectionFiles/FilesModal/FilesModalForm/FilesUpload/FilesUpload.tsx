import { useState } from 'react'
import { message, Upload } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import Button from '../../../../../../../../ui/Button'
import Container from '../../../../../../../../ui/Container'
import Icon from '../../../../../../../../ui/Icon'
import InputLabel from '../../../../../../../../ui/InputLabel'
import Spacer from '../../../../../../../../ui/Spacer'
import { IDocumentForm } from '../../../../../types/types'
import FilesDocViewer from '../FilesDocViewer'

const { Dragger } = Upload

export const FilesUpload = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const { control, getValues } = useFormContext<IDocumentForm>()

  const onCloseModal = () => {
    setVisible(false)
  }

  const onDisplayModal = () => {
    setVisible(true)
  }

  return (
    <>
      <Container display="flex" justifyContent="space-between">
        <InputLabel label="Archivo:" requirement="required" disabled={false} />
        {typeof getValues('file') === 'string' && (
          <Button type="secondary" title="Ver Archivo" onClick={onDisplayModal} />
        )}
      </Container>
      <Spacer size={8} />
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <Dragger
            name="file"
            multiple={false}
            accept=".pdf, .jpg, .jpeg, .png"
            customRequest={() => null}
            maxCount={1}
            height={130}
            onChange={(info) => {
              info.file.status = undefined
              const { name } = info.file

              if (name.length > 54) {
                return message.error(`${name} el nombre del archivo debe ser menor a 54 caracteres`)
              }

              field.onChange(info.file.originFileObj)
            }}
          >
            <p className="ant-upload-drag-icon">
              <Icon size={30} remixiconClass="ri-upload-2-fill" />
            </p>

            <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo</p>
          </Dragger>
        )}
      />
      <FilesDocViewer
        visible={visible}
        onClose={onCloseModal}
        fileName={typeof getValues('file') === 'string' ? getValues('file').toString() : ''}
      />
    </>
  )
}
