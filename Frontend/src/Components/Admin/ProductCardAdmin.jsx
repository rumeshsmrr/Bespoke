import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { delet, put } from "../../../Services/ApiEndPoint";
import toast from "react-hot-toast";

const ProductCardAdmin = ({ product, fetchProducts }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({ ...product });
	const [imageFiles, setImageFiles] = useState(product.images || []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async () => {
		try {
			const response = await put(`api/v1/products/${product._id}`, formData);
			const data = await response.data;
			toast.success(data.message || "Product updated successfully.");
			setIsEditing(false); // Exit editing mode
			fetchProducts();
		} catch (error) {
			console.error("Error updating product:", error);
			toast.error("An error occurred while updating the product.");
		}
	};

	const handleCancel = () => {
		setFormData({ ...product });
		setIsEditing(false);
	};

	const handleDelete = async () => {
		const confirmDelete = await new Promise((resolve) => {
			toast(
				(t) => (
					<div style={{ textAlign: "center" }}>
						<p>Are you sure you want to delete "{product.name}"?</p>
						<div
							style={{
								marginTop: "10px",
								display: "flex",
								justifyContent: "center",
								gap: "10px",
							}}
						>
							<button
								onClick={() => {
									toast.dismiss(t.id); // Dismiss toast
									resolve(true); // Resolve promise with true
								}}
								style={{
									padding: "6px 12px",
									backgroundColor: "#f44336",
									color: "#fff",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								Confirm
							</button>
							<button
								onClick={() => {
									toast.dismiss(t.id);
									resolve(false); // Resolve promise with false
								}}
								style={{
									padding: "6px 12px",
									backgroundColor: "#ccc",
									color: "#000",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				),
				{ duration: Infinity } // Keeps toast visible until dismissed
			);
		});

		if (!confirmDelete) return; // Exit if user cancels

		try {
			const response = await delet(`api/v1/products/${product._id}`);
			const data = await response.data;
			toast.success(data.message || "Product deleted successfully.");
			fetchProducts();
			// onDelete(product._id); // Notify parent component
		} catch (error) {
			toast.error("An error occurred while deleting the product.");
		}
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files).map((file) => {
			console.log(file); // Check what each `file` contains
			return {
				url: URL.createObjectURL(file),
				public_id: "",
				_id: null,
			};
		});

		setImageFiles((prev) => [...prev, ...files]);
	};

	const handleRemoveImage = (index) => {
		setImageFiles((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div
			className={`transition-all duration-500 ease-in-out mx-20 bg-white rounded-xl border shadow-lg hover:shadow-2xl overflow-hidden ${
				isEditing ? "p-8" : "p-4 flex justify-between items-center"
			}`}
		>
			{!isEditing ? (
				<>
					{/* Product View */}
					<div className="grid grid-cols-[8%,60%,20%,1fr] items-center gap-4 w-full">
						{/* First Column (10% width) */}
						<div className="col-span-1">
							<img
								src={product.images[0]?.url}
								alt={product.name}
								className="w-20 h-20 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-110"
							/>
						</div>

						{/* Second Column (60% width) */}
						<div className="col-span-1 flex flex-col items-start text-left justify-start">
							<h3 className="text-[22px] font-semibold text-gray-800">
								{product.name}
							</h3>
							<p
								className={`${
									product.stoke > 0 ? "text-green-500" : "text-red-500"
								} text-[18px]`}
							>
								{product.stoke > 0 ? "In Stock" : "Out of Stock"}
							</p>
						</div>

						{/* Third Column (20% width) */}
						<div className="col-span-1">
							<p className="text-lg font-bold text-gray-700">
								${product.price}
							</p>
						</div>

						{/* Fourth Column (Balance of remaining space) */}
						<div className="col-span-1 ">
							<div className="flex items-center gap-5">
								<button
									onClick={() => setIsEditing(true)}
									className="p-2 rounded-[6px] bg-brown-300 text-white hover:bg-brown-500 transition duration-300"
								>
									<FaPen />
								</button>
								<button
									onClick={handleDelete}
									className="p-2 rounded-[6px] bg-red-500 text-white hover:bg-red-600 transition duration-300"
								>
									<FaTrash />
								</button>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					{/* Edit Form */}
					<form className="w-full space-y-4 text-[20px] ">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								Edit Product
							</h2>
							<button
								type="button"
								onClick={handleCancel}
								className="text-red-500 hover:text-red-700 transition duration-300"
							>
								Cancel
							</button>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Product Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							/>
						</div>

						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Product Description
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows={4}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							></textarea>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Product Stock
							</label>
							<input
								type="number"
								name="stoke"
								value={formData.stoke}
								onChange={(e) => {
									const value = Math.max(0, Number(e.target.value)); // Prevent negative values
									handleInputChange({ target: { name: "stoke", value } });
								}}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							/>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Price
							</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={(e) => {
									const value = Math.max(0, Number(e.target.value)); // Prevent negative values
									handleInputChange({ target: { name: "price", value } });
								}}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							/>
						</div>

						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Product Images
							</label>
							<div className="flex gap-4 items-center flex-wrap  p-4 border-[1.5px] rounded-lg w-full">
								{imageFiles.map((file, index) => (
									<div
										key={index}
										className="relative flex flex-col items-center"
									>
										<img
											src={file.url}
											alt={`Preview ${index}`}
											className="w-20 h-20 object-cover rounded-lg"
										/>
										<button
											type="button"
											onClick={() => handleRemoveImage(index)}
											className="bg-red-600 h-9 w-9 text-white px-2 py-1 mt-3 rounded-full"
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
								onClick={handleCancel}
								className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSave}
								className="px-4 py-2 rounded-lg bg-brown-300 text-white hover:bg-brown-400 transition duration-300"
							>
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

ProductCardAdmin.propTypes = {
	product: PropTypes.object.isRequired,
	fetchProducts: PropTypes.func.isRequired,
};

export default ProductCardAdmin;
