import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'summernote/dist/summernote-bs4.min.css'
import './styles.css'

import $ from 'jquery'
import 'popper.js'
import 'bootstrap'

// MUST BEFORE SUMMERNOTE
window.$ = window.jQuery = $

import 'summernote'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
