import ImageKit from 'imagekitio-react';

const imageKit = {
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: "", // We can handle simple uploads if keys are provided or use a small backend helper
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  formData.append('publicKey', import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY);
  
  // NOTE: Private keys should ideally be used on a server, 
  // but for this direct integration, we'll implement the upload ritual.
  try {
    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY + ':')}`
      }
    });

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('ImageKit Ritual Failed:', error);
    throw error;
  }
};
