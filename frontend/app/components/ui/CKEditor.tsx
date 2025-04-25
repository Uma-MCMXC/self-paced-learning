'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'

interface CKEditorComponentProps {
  id?: string
  name?: string
  label?: string
  value: string
  height?: number
  onChange: (value: string) => void
}

export default function CKEditorComponent({
  id,
  name,
  label,
  value,
  height = 150,
  onChange,
}: CKEditorComponentProps) {
  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label htmlFor={id} className="label font-medium text-sm text-gray-700">
          {label}
        </label>
      )}

      <div className="bg-white border border-gray-300 rounded">
        <CKEditor
          editor={ClassicEditor as any}
          data={value}
          onChange={(_, editor) => {
            const data = editor.getData()
            onChange(data)
          }}
          config={{
            placeholder: 'Enter your question...',
          }}
        />
      </div>

      <style jsx global>{`
        .ck-editor__editable_inline {
          min-height: ${height}px;
        }
      `}</style>
    </div>
  )
}
