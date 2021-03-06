import { useState } from 'react'
import { useGeneralContext } from '../../../../../../shared/contexts/StoreProvider'
import Button from '../../../../../../ui/Button'
import HeaderPlus from '../../../../../../ui/Header/HeaderPlus'
import Icon from '../../../../../../ui/Icon'
import { IProceduresForm } from '../../../types/types'
import FilesModalAdd from '../FilesModal/FilesModalAdd'

interface IFileTitleProps {
  procedure: IProceduresForm | null
  onToggleModal: () => void
}

export const FilesTitle = ({ procedure, onToggleModal }: IFileTitleProps) => {
  const {
    state: {
      auth: {
        admin: { tag },
      },
    },
  } = useGeneralContext()

  const [visibleModalFiles, setvisibleModalFiles] = useState<boolean>(false)

  const onToggleModalFiles = () => {
    setvisibleModalFiles(!visibleModalFiles)
  }

  return (
    <>
      <HeaderPlus
        title={procedure?.title ? procedure.title : '--'}
        disabledButton={!procedure}
        setVisibleModal={onToggleModalFiles}
        plusHeader={
          procedure?.title &&
          (tag === 'Editor' ? (
            <Button type="secondary" icon={<Icon remixiconClass="ri-more-fill" />} onClick={onToggleModal} />
          ) : null)
        }
      />
      <FilesModalAdd procedureId={procedure?.id} visible={visibleModalFiles} setVisible={onToggleModalFiles} />
    </>
  )
}
