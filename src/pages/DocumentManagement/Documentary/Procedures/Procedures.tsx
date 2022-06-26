import { useState } from 'react'
import styled, { css } from 'styled-components'
import { FilesProvider } from '../../../../shared/contexts/FilesProvider'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import EmptyState from '../../../../ui/EmptyState'
import Icon from '../../../../ui/Icon'
import { IProceduresForm } from '../types/types'
import FilesModalEdit from './SectionFiles/FilesModal/FilesModalEdit'
import FilesTable from './SectionFiles/FilesTable'
import FilesTitle from './SectionFiles/FilesTitle'
import ProceduresModalAdd from './SectionProcedures/ProceduresModal/ProceduresModalAdd'
import ProceduresModalEdit from './SectionProcedures/ProceduresModal/ProceduresModalEdit'
import ProceduresProcessTable from './SectionProcedures/ProceduresProcessTable'
import ProceduresProcessTitle from './SectionProcedures/ProceduresProcessTitle'

export const Procedures = () => {
  const [procedureSelected, setProcedureSelected] = useState<IProceduresForm | null>(null)
  const [fileCodeSelected, setFileCodeSelected] = useState<string>('')

  const [changeData, setChangeData] = useState<boolean>(false)
  const [changeDataFiles, setChangeDataFiles] = useState<boolean>(false)

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false)
  const [visibleModalEditFile, setVisibleModalEditFile] = useState<boolean>(false)

  const onToggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const onToggleModalEdit = () => {
    setVisibleModalEdit(!visibleModalEdit)
  }

  const onToggleModalEditFile = () => {
    setVisibleModalEditFile(!visibleModalEditFile)
  }

  const onUpdateTable = () => {
    setChangeData(!changeData)
  }

  const onToggleChangeDataFiles = () => {
    setChangeDataFiles(!changeDataFiles)
  }

  return (
    <StyledProcessContainer display="flex" width="100%">
      <StyledProceduresContainer
        width="30%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <ProceduresProcessTitle />

        <ProceduresProcessTable
          changeData={changeData}
          updateData={onUpdateTable}
          setProcedureSelected={setProcedureSelected}
          setChangeDataFiles={onToggleChangeDataFiles}
        />

        <StyledButtonAdd
          icon={<Icon size={25} remixiconClass="ri-add-line" />}
          $width="70%"
          size="large"
          title="Añadir documento"
          onClick={onToggleModal}
        />

        <ProceduresModalAdd updateData={onUpdateTable} visible={visibleModal} setVisible={onToggleModal} />
      </StyledProceduresContainer>

      <Container width="70%">
        <FilesProvider>
          <FilesTitle procedure={procedureSelected} onToggleModal={onToggleModalEdit} />

          {procedureSelected ? (
            <FilesTable
              procedureSelectedUUID={procedureSelected.id ? procedureSelected.id : 0}
              changeDataSelected={changeDataFiles}
              setFileCodeSelected={setFileCodeSelected}
            />
          ) : (
            <Container width="100%">
              <EmptyState
                fullScreen
                title="No existen archivos"
                description="Para visualizar los archivos, seleccione un documento"
              />
            </Container>
          )}

          <FilesModalEdit
            visible={visibleModalEditFile}
            setVisible={onToggleModalEditFile}
            procedureId={procedureSelected?.id}
            procedureCode={fileCodeSelected}
          />

          <ProceduresModalEdit
            visible={visibleModalEdit}
            setVisible={onToggleModalEdit}
            updateData={onUpdateTable}
            data={procedureSelected}
            setData={setProcedureSelected}
          />
        </FilesProvider>
      </Container>
    </StyledProcessContainer>
  )
}

const StyledProcessContainer = styled(Container)`
  height: 100vh;
`

const StyledButtonAdd = styled(Button)`
  margin-bottom: 25px;
`

const StyledProceduresContainer = styled(Container)`
  ${({ theme }) => css`
    background-color: ${theme.colors['$color-transparent-4']};
    border-right: 6px solid ${theme.colors['white']};
  `}
`
