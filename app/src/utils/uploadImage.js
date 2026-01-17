// API base URL - adjust this to match your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

/**
 * Upload a base64 image to the server
 * @param {string} base64DataUrl - Base64 data URL of the image
 * @param {string} caption - Caption for the image
 * @returns {Promise<{url: string, caption: string}>} - URL and caption of the uploaded image
 */
export async function uploadImage(base64DataUrl, caption = '') {
  try {
    // Convert base64 to blob
    const response = await fetch(base64DataUrl)
    const blob = await response.blob()
    
    // Create FormData
    const formData = new FormData()
    formData.append('image', blob, 'image.jpg')
    formData.append('caption', caption)
    
    // Upload to server
    const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })
    
    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || errorData.message || `Server error: ${uploadResponse.status}`)
    }
    
    const data = await uploadResponse.json()
    return {
      url: `${API_BASE_URL}${data.url}`,
      caption: data.caption || caption
    }
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to server at ${API_BASE_URL}. Make sure the backend is running.`)
    }
    throw error
  }
}

/**
 * Update caption for an image
 * @param {string} imageUrl - Full URL of the image
 * @param {string} caption - New caption
 * @returns {Promise<void>}
 */
export async function updateCaption(imageUrl, caption) {
  const filename = imageUrl.split('/').pop()
  
  const response = await fetch(`${API_BASE_URL}/api/images/${filename}/caption`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caption })
  })
  
  if (!response.ok) {
    throw new Error('Failed to update caption')
  }
}

/**
 * Delete an image from the server
 * @param {string} imageUrl - Full URL of the image to delete
 * @returns {Promise<void>}
 */
export async function deleteImage(imageUrl) {
  // Extract filename from URL
  const filename = imageUrl.split('/').pop()
  
  const response = await fetch(`${API_BASE_URL}/api/images/${filename}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    console.error('Failed to delete image from server')
  }
}
