import type { EditViewComponent, PayloadServerReactComponent } from 'payload'

import { EditView } from '@payloadcms/next/views'
import React from 'react'

const CustomEditView: PayloadServerReactComponent<EditViewComponent> = () => {
  return (
    <div>
      <div style={{ background: 'red' }}>custom edit view title</div>
      <EditView />
    </div>
  )
}
export default CustomEditView
