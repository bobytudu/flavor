// import React, { useState } from 'react'
// import { useDropzone } from 'react-dropzone'
// import Draggable from 'react-draggable'
// import img7 from 'assets/img7.png'

// export default function ImageEditor() {
//   const [images, setImages] = useState<any[]>([])
//   let tempImage = {
//     id: Math.random().toString(),
//     position: { x: 0, y: 0 }
//   }

//   const onDrop = (acceptedFiles: any[]) => {
//     console.log(acceptedFiles)
//     setImages((prevImages) => [
//       ...prevImages,
//       ...acceptedFiles.map((file) => ({
//         id: Math.random().toString(),
//         file,
//         position: { x: 0, y: 0 }
//       }))
//     ])
//   }

//   const handleDrag = (index: number, newPosition: { x: number; y: number }) => {
//     setImages((prevImages) => prevImages.map((image, i) => (i === index ? { ...image, position: newPosition } : image)))
//   }

//   return (
//     <div>
//       <div>
//         <h2>Canvas</h2>
//         <div
//           style={{
//             width: '100%',
//             height: '500px',
//             border: '1px solid black',
//             position: 'relative'
//           }}>
//           <Draggable
//             key={tempImage.id}
//             position={tempImage.position}
//             onStop={(e, data) => handleDrag(0, { x: data.x, y: data.y })}>
//             <img
//               src={img7}
//               alt={`img_${0 + 1}`}
//               style={{
//                 // position: 'absolute'
//                 width: 100,
//                 height: 100
//               }}
//             />
//           </Draggable>
//           {images.map((image, index) => (
//             <Draggable
//               key={image.id}
//               position={image.position}
//               onStop={(e, data) => handleDrag(index, { x: data.x, y: data.y })}>
//               <img
//                 src={img7}
//                 alt={`img_${index + 1}`}
//                 style={{
//                   // position: 'absolute'
//                   width: '100%',
//                   height: '100%'
//                 }}
//               />
//             </Draggable>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h2>Upload Images</h2>
//         <div {...useDropzone({ onDrop })}>Drop images here or click to select files.</div>
//       </div>
//     </div>
//   )
// }

import React from 'react'

export default function ImageDragger() {
  return <div>ImageDragger</div>
}
