'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [files, setFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    supabase.storage.from('drive').list().then(({ data }) => {
      setFiles(data || [])
    })
  }, [])

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    
    await supabase.storage.from('drive').upload(fileName, file)
    setUploading(false)
    e.target.value = ''
    window.location.reload()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        CloudDrive Mini
      </h1>
      
      {/* Upload */}
      <div className="border-2 border-dashed border-gray-400 rounded-2xl p-12 text-center hover:border-blue-400 mb-12 cursor-pointer hover:bg-blue-50">
        <input type="file" onChange={uploadFile} className="hidden" id="upload" />
        <label htmlFor="upload">
          <div className="text-2xl font-bold mb-4">
            {uploading ? 'Uploading...' : 'Click to upload'}
          </div>
          <div className="w-20 h-20 bg-blue-500 text-white rounded-2xl mx-auto flex items-center justify-center mb-4">
            📁
          </div>
          <p>PNG, JPG, PDF up to 50MB</p>
        </label>
      </div>

      {/* Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map(file => (
          <a
            key={file.name}
            href={supabase.storage.from('drive').getPublicUrl(file.name).data.publicUrl}
            target="_blank"
            className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border hover:border-blue-200"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
              📄
            </div>
            <h3 className="font-semibold text-center truncate">{file.name}</h3>
          </a>
        ))}
      </div>
    </div>
  )
}
