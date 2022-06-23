import React, { useState, useContext } from 'react'
import { DocsDataType } from '../../pages/DocumentManagement/Documentary/Procedures/SectionFiles/FilesTable/FilesTable'

interface FilesProviderProps {
  files: DocsDataType[]
  setFiles: React.Dispatch<React.SetStateAction<DocsDataType[]>>
}

const FilesContext = React.createContext<FilesProviderProps | null>(null)

export const FilesProvider = ({ children }: { children: JSX.Element[] }) => {
  const [files, setFiles] = useState<DocsDataType[]>([])

  const value: FilesProviderProps = {
    files,
    setFiles,
  }

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}

export const useFilesContext = () => {
  const context = useContext(FilesContext)
  if (context === null) {
    throw new Error('useFilesContext must be used within a FilesProvider')
  }
  return context
}
