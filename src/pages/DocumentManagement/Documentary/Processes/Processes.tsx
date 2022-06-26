import { useState } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import HeaderPlus from '../../../../ui/Header/HeaderPlus'
import Icon from '../../../../ui/Icon'
import ProcessesModalCreate from './ProcessesModal/ProcessesModalCreate'
import ProcessesModalViewPhoto from './ProcessesModal/ProcessesModalViewPhoto'
import ProcessesTable from './ProcessesTable'

export const Processes = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalView, setVisibleModalView] = useState(false)
  const [changeData, setChangeData] = useState(false)

  const onToggleModal = () => {
    setVisibleModal(!visibleModal)
  }
  const onToggleModalView = () => {
    setVisibleModalView(!visibleModalView)
  }

  const onUpdateTable = () => {
    setChangeData(!changeData)
  }

  return (
    <StyledProcessesContainer width="100%">
      <HeaderPlus
        title="PROCESOS"
        disabledButton={false}
        setVisibleModal={onToggleModal}
        plusHeader={<Button type="secondary" icon={<Icon remixiconClass="ri-image-line" />} onClick={onToggleModalView} />}
      />
      <ProcessesTable updateData={onUpdateTable} changeData={changeData} />
      <ProcessesModalViewPhoto visible={visibleModalView} setVisible={onToggleModalView} />
      <ProcessesModalCreate updateData={onUpdateTable} visible={visibleModal} setVisible={onToggleModal} />
    </StyledProcessesContainer>
  )
}

const StyledProcessesContainer = styled(Container)`
  height: calc(100% - 57px);
`
