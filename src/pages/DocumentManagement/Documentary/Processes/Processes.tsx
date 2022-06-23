import { useState } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import HeaderPlus from '../../../../ui/Header/HeaderPlus'
import Icon from '../../../../ui/Icon'
import ProcessesModalCreate from './ProcessesModal/ProcessesModalCreate'
import ProcessesTable from './ProcessesTable'

export const Processes = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [changeData, setChangeData] = useState(false)

  const onToggleModal = () => {
    setVisibleModal(!visibleModal)
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
        plusHeader={<Button type="secondary" icon={<Icon remixiconClass="ri-more-fill" />} onClick={onToggleModal} />}
      />
      <ProcessesTable updateData={onUpdateTable} changeData={changeData} />
      <ProcessesModalCreate updateData={onUpdateTable} visible={visibleModal} setVisible={onToggleModal} />
    </StyledProcessesContainer>
  )
}

const StyledProcessesContainer = styled(Container)`
  height: calc(100% - 57px);
`
