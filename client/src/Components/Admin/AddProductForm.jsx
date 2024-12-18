import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function AddProductForm({ onCreate, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stoke: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedImages);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stoke", formData.stoke);

      // Append image files to the FormData
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Call the onCreate function to make the API call
      onCreate(formDataToSend);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-secondary-100 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="mb-4">
        <label className="block text-secondary-100 mb-2">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border-2 border-secondary-100 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-secondary-100 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="border-2 border-secondary-100 rounded-lg p-2 w-full"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-secondary-100 mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="border-2 border-secondary-100 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-secondary-100 mb-2">Stock</label>
        <input
          type="number"
          name="stoke"
          value={formData.stoke}
          onChange={handleInputChange}
          className="border-2 border-secondary-100 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-secondary-100 mb-2">Images</label>
        <div className="flex gap-4 items-center flex-wrap">
          {imageFiles.map((file, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
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
          {imageFiles.length < 3 && (
            <label className="cursor-pointer bg-secondary-100 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaPlus /> Add Image
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-secondary-100 text-white rounded-lg"
        >
          Create
        </button>
      </div>
    </div>
  );
}

AddProductForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
