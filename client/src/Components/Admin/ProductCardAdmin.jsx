import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";

export default function ProductCardAdmin({ product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated Product:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...product });
    setIsEditing(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Simulate image upload to a service like Cloudinary
        const formDataToUpload = new FormData();
        formDataToUpload.append("file", file);
        formDataToUpload.append("upload_preset", "your_upload_preset"); // For Cloudinary

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formDataToUpload,
          }
        );
        const data = await response.json();

        if (response.ok) {
          const newImage = { url: data.secure_url, public_id: data.public_id };
          setFormData({
            ...formData,
            images: [...formData.images, newImage],
          });
        } else {
          console.error("Error uploading image:", data.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out bg-white rounded-2xl border-2 border-secondary-100 shadow-md overflow-hidden ${
        isEditing ? "p-8" : "p-4 flex justify-between items-center"
      }`}
      style={{ width: isEditing ? "100%" : "auto" }}
    >
      {!isEditing ? (
        <>
          {/* Product View */}
          <div className="flex items-center gap-4">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p
                className={`${
                  product.stoke > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stoke > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold text-secondary-100">
            ${product.price}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-secondary-100 text-white p-2 rounded-full hover:bg-secondary-200"
            >
              <FaPen />
            </button>
            <button className="bg-secondary-100 text-white p-2 rounded-full hover:bg-red-700">
              <FaTrash />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Edit Form */}
          <form className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Product</h2>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4">
              <label className="block text-secondary-100 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-2 border-secondary-100 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-secondary-100 mb-2">
                Product Images
              </label>
              <div className="flex gap-4 items-center">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                  >
                    <img
                      src={img.url}
                      alt={`Product ${index}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="bg-red-600 text-white px-2 py-1 mt-2 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                {formData.images.length < 3 && (
                  <label className="cursor-pointer bg-secondary-100 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaPlus /> Add Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAddImage}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-secondary-100 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="border-2 border-secondary-100 rounded-lg p-2 w-full"
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-secondary-100 mb-2">
                Product Stock
              </label>
              <input
                type="number"
                name="stoke"
                value={formData.stoke}
                onChange={handleInputChange}
                className="border-2 border-secondary-100 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-secondary-100 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="border-2 border-secondary-100 rounded-lg p-2 w-full"
              />
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-secondary-100 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

ProductCardAdmin.propTypes = {
  product: PropTypes.object.isRequired,
};
