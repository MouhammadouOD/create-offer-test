import React, { ReactElement, useEffect, useState } from 'react'
import { ErrorForm } from '..'
import { useController, useForm } from 'react-hook-form'
import { ProgressBar } from '@/components/common'
import { file } from '@/constants'
import { BiTrash } from 'react-icons/bi'
import { PropsForm } from '@/types/formType/props-form'
import { isArrayEmptyOrContainsEmptyObjects } from '@/helpers/common'

interface Props extends PropsForm {
  value?: string
  multiple?: boolean
  maxFiles?: number
  hasPreview?: boolean
  typeFile?: 'all' | 'image' | 'pdf' | 'document' | 'jpeg'
  progress?: number
  unregister?: ReturnType<typeof useForm>['unregister']
}

const getFileSize = (fileSize: number) => {
  return fileSize / 1000000 + 'Mb, '
}
const getFormat = (listFormat: string[]) => {
  return listFormat
    .join()
    .replace(/image\//g, ' ')
    .replace(/application\//g, ' ')
}

const infosImage =
  getFileSize(file.FILE_IMAGE_SIZE) +
  getFormat(file.FILE_IMAGE_SUPPORTED_FORMATS)

const infosImageJpg =
  getFileSize(file.FILE_IMAGE_SIZE) +
  getFormat(file.FILE_JPEG_SUPPORTED_FORMATS)

const infosDocument =
  getFileSize(file.FILE_DOCUMENT_SIZE) + getFormat(['pdf', ' docx', ' doc'])

const infosDocumentPdf =
  getFileSize(file.FILE_DOCUMENT_SIZE) +
  getFormat(file.FILE_DOCUMENT_SUPPORTED_FORMATS_PDF)

const FileForm = ({
  name: nameField,
  value: valueField,
  register,
  infoMessage,
  maxFiles,
  errors,
  label,
  required,
  sizeField = 'normal',
  multiple = false,
  hasPreview = false,
  typeFile = 'all',
  progress = 0,
  control,
  ...props
}: Props): ReactElement => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | []>([])
  const [errorMaxFile, setErrorMaxFile] = useState<string | null>(null)
  const fontSize = sizeField === 'normal' ? 'text-base xl:text-lg' : 'text-base'
  const heightField = sizeField === 'normal' ? '' : 'h-7'
  const {
    field: { onChange, name, value }
  } = useController({
    name: nameField,
    control,
    rules: { required: required ? true : false },
    defaultValue: valueField
  })

  useEffect(() => {
    if (progress === 100) {
      setSelectedFiles([])
    }
  }, [progress])

  useEffect(() => {
    const isEmpty = isArrayEmptyOrContainsEmptyObjects(value)
    if (!isEmpty) {
      const files: any[] = Array.from(value)
      setSelectedFiles(files)
    }
  }, [value])

  let infos
  switch (typeFile) {
    case 'image':
      infos = infosImage
      break
    case 'jpeg':
      infos = infosImageJpg
      break
    case 'document':
      infos = infosDocument
      break
    case 'pdf':
      infos = infosDocumentPdf
      break
    default:
      infos = infosDocument + getFormat(file.FILE_IMAGE_SUPPORTED_FORMATS)
  }

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const files: any[] = Array.from(event.target.files)
      onChange(files)
      setSelectedFiles(files)
    }
  }

  /* const checkExtensionFile = (extension: string) => {
    return file.FILE_IMAGE_SUPPORTED_FORMATS.includes(extension)
  } */

  const deleteFile = (index: number) => {
    if (selectedFiles?.length) {
      const newListFiles = selectedFiles.filter((_, idx) => idx !== index)
      setSelectedFiles(prevState => prevState.filter((_, idx) => idx !== index))
      onChange(newListFiles.length ? newListFiles : undefined)
    }
  }

  const errorFiles = (index: number) => {
    const listErrors: any = errors ? errors : null
    if (listErrors && listErrors[index]) {
      return listErrors[index].message
    }
  }

  return (
    <>
      {label && (
        <label
          className={`flex flex-row items-center dark:text-gray-200 ${fontSize}`}
          htmlFor={name}
        >
          {label} {required ? '*' : null} :{' '}
          {/*  <span className='pl-1 text-sm font-semibold text-red-400'>
            {' '}
            ({infos})
          </span> */}
        </label>
      )}

      <span className='italic text-base first-letter:uppercase text-gray-500 dark:text-gray-500'>
        {infoMessage}
      </span>
      <input
        {...props}
        multiple={multiple}
        type='file'
        disabled={maxFiles && selectedFiles.length >= maxFiles ? true : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (
            maxFiles &&
            e?.target?.files &&
            Array.from(e.target.files).length > maxFiles
          ) {
            setErrorMaxFile(
              `Nombre de fichier dépassant le nombre autorisé de ${maxFiles}`
            )
            return false
          }
          handlePreview(e)
        }}
        className={`shadow appearance-none border rounded w-full py-3 px-3 mt-1 leading-tight focus:outline-none focus:shadow-md dark:bg-dark-light text-gray-700 dark:text-gray-200 dark:border-dark-light ${heightField}`}
      />
      <div className='flex flex-col space-y-2'>
        <span className='italic text-sm text-gray-500 dark:text-gray-200'>
          ({infos})
        </span>
        {errors && <ErrorForm>{String(errors)}</ErrorForm>}

        {errorMaxFile && <ErrorForm>{errorMaxFile}</ErrorForm>}
        {progress > 0 && (
          <ProgressBar type='upload' level={progress} color='red-500' />
        )}
      </div>
      <div
        className={`flex-col flex-wrap mt-2 ${hasPreview ? 'flex' : 'hidden'}`}
      >
        {selectedFiles.length > 0 && (
          <span className='text-sm'>
            Nombre de fichiers :{' '}
            <span className='text-base text-red-400'>
              {selectedFiles.length}
            </span>
            /{maxFiles || ''}
          </span>
        )}
        {selectedFiles.length > 0 &&
          Array.from(selectedFiles).map((file: any, index: number) => (
            <div
              key={index}
              className='my-1 p-1 rounded-lg w-full border border-gray-300 '
            >
              <div className='w-full flex flew-row space-x-2 items-center truncate'>
                <button
                  className='rounded p-2 bg-orange-200 cursor-pointer hover:bg-orange-300 focus:outline-none outline-none '
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    deleteFile(index)
                  }
                >
                  <BiTrash className='text-white text-base' />
                </button>

                <div className='w-4/5 truncate text-gray-700 dark:text-gray-200'>
                  {file.name}
                </div>
              </div>
              {/* Manage errors when it's for multiple upload files */}
              {errorFiles(index) && <ErrorForm>{errorFiles(index)}</ErrorForm>}
              {/* Manage error when it's for one upload file */}
              {errors ? (
                <ErrorForm>
                  <div>{String(errors)}</div>
                </ErrorForm>
              ) : null}
            </div>
          ))}
      </div>
    </>
  )
}

export default FileForm
