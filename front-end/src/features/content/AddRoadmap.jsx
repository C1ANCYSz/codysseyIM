import { useForm } from "react-hook-form";
import { useGetRoadmaps } from "../../hooks/courses/useGetRoadmaps";
import { useAddRoadmap } from "../../hooks/user/content-manager/useAddRoadmap";
import { FaPlus, FaImage } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

function AddRoadmap() {
  const { roadmaps: { categories } = {} } = useGetRoadmaps();
  const [newCategory, setNewCategory] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { addRoadmap, isLoading } = useAddRoadmap();

  function onSubmit(data) {
    addRoadmap({
      ...data,
      image: previewImage,
    });
    reset();
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-footer-800 font-body flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-footer-900 container max-w-4xl rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Create New Roadmap
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center space-y-4">
              <div className="group relative">
                <img
                  src={previewImage}
                  alt="Roadmap Preview"
                  className="h-48 w-48 rounded-xl object-cover shadow-lg transition-transform group-hover:scale-105"
                />
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <FaImage className="text-3xl text-white" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              </div>
              <span className="text-sm text-gray-400">
                Click to upload image
              </span>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                {newCategory ? (
                  <input
                    type="text"
                    placeholder="Enter new category"
                    className="bg-footer-800 border-primary-600 focus:border-primary-500 w-full rounded-lg border-2 p-3 text-white transition-colors outline-none"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                ) : (
                  <select
                    className="bg-footer-800 border-primary-600 focus:border-primary-500 w-full rounded-lg border-2 p-3 text-white transition-colors outline-none"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    onChange={(e) => {
                      if (e.target.value === "other") {
                        setNewCategory(true);
                        e.target.value = ""; // Clear the select value
                      }
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="other">+ Add New Category</option>
                  </select>
                )}
                {errors.category && (
                  <span className="text-sm text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <input
                type="text"
                placeholder="Roadmap Title"
                className="bg-footer-800 border-primary-600 focus:border-primary-500 w-full rounded-lg border-2 p-3 text-xl text-white transition-colors outline-none"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}

              <textarea
                placeholder="Roadmap Description"
                className="bg-footer-800 border-primary-600 focus:border-primary-500 min-h-[100px] w-full rounded-lg border-2 p-3 text-white transition-colors outline-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
            >
              {isLoading ? (
                "Creating..."
              ) : (
                <>
                  <FaPlus /> Create Roadmap
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddRoadmap;
