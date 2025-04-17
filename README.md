import React from "react";

export default function ImageGallery() {
  // Create an array for images from 1.png to 31.png
  const imageArray = Array.from({ length: 31 }, (_, index) => ({
    src: `/1-${index + 1}.png`, // Image path (e.g., /1-1.png, /1-2.png, etc.)
    alt: `Image ${index + 1}`,   // Alt text for each image
  }));

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {imageArray.map((image, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={image.src}
              alt={image.alt}
              className="w-32 h-32 object-cover rounded-md shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
