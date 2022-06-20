import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'

const FilesModalSchema = yup.object().shape({
  title: yup.string().required().min(2).max(100),
  version: yup.number().required().min(1),
  code: yup.string().required().min(2).max(50),
  effective_date: yup.date().required(),
  approval_date: yup.date().required(),
  name: yup.string(),
  nro_pages: yup.string(),
  file: yup.mixed().required(),
})

export const FilesModalResolver = yupResolver(FilesModalSchema)
