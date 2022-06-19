import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'

const FilesModalSchema = yup.object().shape({
  title: yup.string().required().min(2).max(100),
  version: yup.number().required(),
  code: yup.string().required().min(2).max(50),
  effective_date: yup.date().required(),
  approval_date: yup.date().required(),
  name: yup.string(),
  nro_pages: yup.string(),
})

export const FilesModalResolver = yupResolver(FilesModalSchema)
