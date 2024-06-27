import React, { useState } from "react"
import { useParams } from "react-router-dom"
import MarkAsPending from "../TicketClosed/MarkAsPending"
import CloseTicket from "../TicketClosed/CloseTicket"

const FileUploadForm = () => {
  const { id } = useParams()

  // State for images (images) and technician remarks
  const [formData, setFormData] = useState({
    images: [],
    details: "",
    ticket: id,
  })
  const [imagePreviews, setImagePreviews] = useState([])

  // Destructuring state variables for easier access
  const { images, details, ticket } = formData

  // Function to handle file selection
  const handleFileSelect = async event => {
    event.preventDefault()
    const selectedFiles = Array.from(
      event.target.files || event.dataTransfer.files
    )

    const newFiles = []
    const newPreviews = []

    // Function to compress image using canvas
    const compressImage = async imageFile => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onload = event => {
          const img = new Image()
          img.src = event.target.result
          img.onload = () => {
            const canvas = document.createElement("canvas")
            const MAX_WIDTH = 800 // Maximum width for compressed image
            const MAX_HEIGHT = 600 // Maximum height for compressed image
            let width = img.width
            let height = img.height

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }

            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob(
              blob => {
                resolve(blob)
              },
              imageFile.type,
              0.7
            ) // Adjust quality (0.7 is 70% quality)
          }
        }
      })
    }

    for (let i = 0; i < selectedFiles.length && i < 3; i++) {
      const selectedFile = selectedFiles[i]

      // Check file type using MIME type or file extension
      if (
        !selectedFile.type.startsWith("image/") &&
        !/\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name)
      ) {
        // Handle non-image files
        continue
      }

      // Compress image and update state
      const compressedBlob = await compressImage(selectedFile)
      newFiles.push(new File([compressedBlob], selectedFile.name))
      newPreviews.push(URL.createObjectURL(compressedBlob))
    }

    // Update state with new images and previews
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles].slice(0, 3),
    }))

    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  // Function to handle drag over event
  const handleDragOver = event => {
    event.preventDefault()
  }

  // Function to handle drop event
  const handleDrop = event => {
    event.preventDefault()
    handleFileSelect(event)
  }

  // Function to remove image by index
  const handleRemoveImage = index => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  return (
    <>
      <h1 className="text-xl font-medium mb-3 mt-3">Upload Image</h1>
      <form
        id="file-upload-form"
        className="w-full max-w-sm mx-auto p-6 border-2 border-dashed border-gray-300 rounded-3xl text-center"
      >
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />
        <label
          id="file-drag"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          {imagePreviews.length > 0 ? (
            <div className="flex justify-center gap-4 flex-wrap">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative my-4">
                  <img
                    id={`file-image-${index}`}
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover mx-auto border border-gray-500  rounded-xl"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-1 mr-1 border-2 border-black text-black rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span id="start-one">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Select a file or drag here</span>
            </span>
          )}
        </label>
      </form>
      <h1 className="text-xl font-medium mb-3 mt-3">Technician Remarks</h1>
      <textarea
        className="w-full h-32 p-3 border dark:bg-[#181818] rounded-xl"
        placeholder="Enter your remarks here"
        value={details}
        onChange={e =>
          setFormData(prev => ({
            ...prev,
            details: e.target.value,
          }))
        }
      ></textarea>
      <div className="mt-5 flex justify-between">
        <MarkAsPending formData={formData} />
        <CloseTicket formData={formData} />
      </div>
    </>
  )
}

export default FileUploadForm
