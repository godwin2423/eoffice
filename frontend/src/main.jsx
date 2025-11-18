import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'summernote/dist/summernote-bs4.min.css'
import './styles.css'
import $ from 'jquery'
import 'popper.js'
import 'bootstrap'
import 'summernote'

window.$ = window.jQuery = $

const root = createRoot(document.getElementById('root'))
root.render(<App />)
