import { message, Spin, Upload, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { Controller, useFormContext } from 'react-hook-form'
import Container from '../../../../../../../../ui/Container'
import Icon from '../../../../../../../../ui/Icon'
import InputLabel from '../../../../../../../../ui/InputLabel'
import Text from '../../../../../../../../ui/Typography/Text'
import { IDocumentForm } from '../../../../../types/types'

const { Dragger } = Upload

export const FilesUpload = () => {
  const { control, getValues } = useFormContext<IDocumentForm>()

  return (
    <>
      <InputLabel label="Archivo:" requirement="required" disabled={false} />
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <Dragger
            name="file"
            multiple={false}
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .xlsx, .xls, .csv"
            customRequest={() => null}
            maxCount={1}
            height={130}
            showUploadList={false}
            onChange={(info) => {
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

            {getValues('file') ? (
              <Container className="ant-typography-ellipsis">
                <Text textAlign="center" level={3} ellipsis>
                  {getValues('file.name')}
                </Text>
              </Container>
            ) : (
              <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo</p>
            )}
          </Dragger>
        )}
      />
    </>
  )
}
