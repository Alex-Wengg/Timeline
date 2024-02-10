import React from 'react'
import { render } from 'react-dom'
import Timeline from './Timeline'
import 'react-calendar-timeline/lib/Timeline.css'

const App = () => (
  <div>
    < Timeline />
  </div>
)

render(<App />, document.getElementById('root'))
