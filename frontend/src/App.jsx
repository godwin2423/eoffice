import React, { useState, useRef, useEffect } from 'react'
import { generateCircular } from './api'

export default function App() {
  const contentEditorRef = useRef(null)
  const modalEditorRef = useRef(null)
  const [circularNumber, setCircularNumber] = useState('')
  const [toText, setToText] = useState('')
  const [copyTo, setCopyTo] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Initialize summernote editors
  useEffect(() => {
    // Wait for jQuery and Summernote to be available
    const timer = setTimeout(() => {
      if (window.$ && window.$.fn.summernote && contentEditorRef.current) {
        try {
          if (!window.$(contentEditorRef.current).hasClass('note-editor')) {
            window.$(contentEditorRef.current).summernote({
              height: 160,
              toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'italic', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']]
              ],
              disableDragAndDrop: false,
              popover: {
                image: [['imagesize', ['imagesize']]],
                link: [['link', ['linkDialogShow', 'unlink']]],
                air: [['color', ['color']], ['font', ['bold', 'italic', 'underline', 'clear']]]
              },
              dialogsInBody: true
            })
          }
        } catch (e) {
          console.error('Error initializing main editor:', e)
        }
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (modalOpen && window.$ && window.$.fn.summernote && modalEditorRef.current) {
      const timer = setTimeout(() => {
        try {
          if (!window.$(modalEditorRef.current).hasClass('note-editor')) {
            window.$(modalEditorRef.current).summernote({
              height: 280,
              toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'italic', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']]
              ],
              disableDragAndDrop: false,
              popover: {
                image: [['imagesize', ['imagesize']]],
                link: [['link', ['linkDialogShow', 'unlink']]],
                air: [['color', ['color']], ['font', ['bold', 'italic', 'underline', 'clear']]]
              },
              dialogsInBody: true
            })
          }
          window.$(modalEditorRef.current).summernote('code', previewHtml)
        } catch (e) {
          console.error('Error initializing modal editor:', e)
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [modalOpen, previewHtml])

  const onGenerate = async () => {
    let contentsHtml = ''
    try {
      if (window.$ && window.$.fn.summernote && contentEditorRef.current) {
        contentsHtml = window.$(contentEditorRef.current).summernote('code')
      }
    } catch (e) {
      console.error('Error getting editor content:', e)
    }
    setLoading(true)
    try {
      const payload = {
        circularNumber,
        contentsHtml,
        toText,
        copyTo
      }
      const result = await generateCircular(payload)
      if (result && result.success) {
        setPreviewHtml(result.html)
        setModalOpen(true)
      } else {
        alert('Failed to generate: ' + (result?.error || 'unknown'))
      }
    } catch (err) {
      console.error(err)
      alert('Error generating template')
    } finally {
      setLoading(false)
    }
  }

  const onReset = () => {
    setCircularNumber('')
    try {
      if (window.$ && window.$.fn.summernote && contentEditorRef.current) {
        window.$(contentEditorRef.current).summernote('reset')
      }
    } catch (e) {
      console.error('Error resetting editor:', e)
    }
    setToText('')
    setCopyTo('')
    setPreviewHtml('')
    setModalOpen(false)
  }

  return (
    <div className="container">
      <h2>Circular Generator</h2>

      <div className="form-row">
        <label>Circular No:</label>
        <input value={circularNumber} onChange={e => setCircularNumber(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Content:</label>
        <div ref={contentEditorRef} className="summernote"></div>
      </div>

      <div className="form-row">
        <label>To:</label>
        <textarea value={toText} onChange={e => setToText(e.target.value)} rows={4} />
      </div>

      <div className="form-row">
        <label>Copy To:</label>
        <input value={copyTo} onChange={e => setCopyTo(e.target.value)} />
      </div>

      <div className="actions">
        <button onClick={onGenerate} disabled={loading} className="btn primary">{loading ? 'Generating...' : 'Generate'}</button>
        <button onClick={onReset} className="btn">Reset</button>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            <div className="modal-body">
              <div className="modal-toolbar">
                <button
                  className="btn"
                  onClick={() => {
                    try {
                      if (window.$ && window.$.fn.summernote && modalEditorRef.current) {
                        const html = window.$(modalEditorRef.current).summernote('code')
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(html).then(() => alert('HTML copied to clipboard'));
                        } else {
                          alert('Clipboard API not available');
                        }
                      }
                    } catch (e) {
                      console.error('Error copying HTML:', e)
                      alert('Error copying HTML')
                    }
                  }}
                >Copy HTML</button>
                <button
                  className="btn"
                  onClick={() => {
                    try {
                      if (window.$ && window.$.fn.summernote && modalEditorRef.current) {
                        const html = window.$(modalEditorRef.current).summernote('code')
                        const blob = new Blob([html], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `circular-${Date.now()}.html`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                      }
                    } catch (e) {
                      console.error('Error downloading HTML:', e)
                      alert('Error downloading HTML')
                    }
                  }}
                >Download HTML</button>
              </div>

              <div ref={modalEditorRef} className="summernote"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
