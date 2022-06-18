import { useEffect, useState } from 'react'
import Tag from 'antd/lib/tag'
import Container from '../../../../../../../../ui/Container'
import styled from 'styled-components'
import { AxiosResponse } from 'axios'
import { getRols } from '../../../../../../../../shared/utils/services/rolsServices'
import { notification, Spin } from 'antd'
import { IRolsForm } from '../../../../../../Rols/types/types'

const { CheckableTag } = Tag

interface IFilesCheckableTag {
  checkAllSelectedTags: (nextSelectedTags: IRolsForm, checked: boolean) => void
}

export const FilesCheckableTag = ({ checkAllSelectedTags }: IFilesCheckableTag) => {
  const [rols, setRols] = useState<IRolsForm[]>([])
  const [selectedTags, setSelectedTags] = useState<IRolsForm[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (tag: IRolsForm, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t.id !== tag.id)
    setSelectedTags(nextSelectedTags)

    checkAllSelectedTags(tag, checked)
  }

  const loadDataRols = async () => {
    try {
      setLoading(true)
      const result: AxiosResponse<any, any> = await getRols()
      const { data } = result
      const { error, rols } = data
      if (error) {
        notification['warn']({
          message: error,
        })
      }

      if (rols) {
        setRols(rols)
      }

      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      notification['error']({
        message: error.message as string,
      })
    }
  }

  useEffect(() => {
    loadDataRols()
  }, [])

  if (loading) {
    return <Spin />
  }

  return (
    <StyledWrapContainer>
      <StyledContainer width="max-content" display="flex" alignItems="center">
        {rols.map((tag) => (
          <CheckableTag
            key={tag.id}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag.name.toUpperCase()}
          </CheckableTag>
        ))}
      </StyledContainer>
    </StyledWrapContainer>
  )
}

const StyledWrapContainer = styled(Container)`
  width: 100%;
  overflow-x: scroll;
`

const StyledContainer = styled(Container)`
  height: 50px;
`
