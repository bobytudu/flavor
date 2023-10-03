// import Draggable from 'react-draggable'
// import { useState } from 'react'

// export default function App() {
//   // const snapPoints = useSnap(points)
//   const [position, setPosition] = useState({ x: 0, y: 0 })

//   const handleDrag = (e, ui) => {
//     const { x, y } = ui
//     setPosition(snapToGrid(x, y))
//   }

//   return (
//     <Draggable
//       onDrag={handleDrag}
//       position={position}>
//       <div style={{ width: '50px', height: '50px', backgroundColor: 'red' }} />
//     </Draggable>
//   )
// }

// function snapToGrid(x, y) {
//   const snappedX = snap(x)
//   const snappedY = snap(y)
//   return { x: snappedX, y: snappedY }
// }

// function snap(value) {
//   const step = 25
//   return Math.round(value / step) * step
// }
import React from 'react'

export default function Images() {
  return <div>Images</div>
}
