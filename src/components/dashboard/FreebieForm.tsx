import React, { useState, useEffect } from 'react';
import { Save, X, Upload, Trash2, GripVertical } from 'lucide-react';
import { useBookStore } from '../../store/bookStore';
import { Freebie } from '../../types/Book';

interface FreebieFormProps {
  freebie?: Freebie;
  onSave: () => void;
  onCancel: () => void;
}

export const FreebieForm: React.FC<FreebieFormProps> = ({ freebie, onSave, onCancel }) => {
  const { addFreebie, updateFreebie } = useBookStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Coloring Books',
    downloadUrl: '',
    coverImage: '',
    previewImages: [] as string[],
    featured: false,
    status: 'draft' as 'published' | 'draft'
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Coloring Books', 'Activity Books', 'Educational', 'Journals'];

  useEffect(() => {
    if (freebie) {
      setFormData({
        title: freebie.title,
        description: freebie.description,
        category: freebie.category,
        downloadUrl: freebie.downloadUrl,
        coverImage: freebie.coverImage,
        previewImages: freebie.previewImages,
        featured: freebie.featured || false,
        status: freebie.status
      });
    }
  }, [freebie]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.downloadUrl.trim()) newErrors.downloadUrl = 'Download URL is required';
    if (!formData.coverImage.trim()) newErrors.coverImage = 'Cover image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (freebie) {
      updateFreebie(freebie.id, formData);
    } else {
      addFreebie(formData);
    }
    
    onSave();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addPreviewImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setFormData(prev => ({
        ...prev,
        previewImages: [...prev.previewImages, url]
      }));
    }
  };

  const removePreviewImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      previewImages: prev.previewImages.filter((_, i) => i !== index)
    }));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null) return;
    
    const newImages = [...formData.previewImages];
    const draggedImage = newImages[draggedIndex];
    
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    
    setFormData(prev => ({ ...prev, previewImages: newImages }));
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {freebie ? 'Edit Freebie' : 'Add New Freebie'}
          </h1>
          <p className="text-gray-600">
            {freebie ? 'Update freebie information' : 'Create a new free resource'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter freebie title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter freebie description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Download URL *
              </label>
              <input
                type="url"
                value={formData.downloadUrl}
                onChange={(e) => handleInputChange('downloadUrl', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.downloadUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://example.com/download-link"
              />
              {errors.downloadUrl && <p className="text-red-500 text-sm mt-1">{errors.downloadUrl}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Images</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image *
              </label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.coverImage ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter cover image URL"
              />
              {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
              {formData.coverImage && (
                <div className="mt-4">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-32 h-40 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Preview Images
                </label>
                <button
                  type="button"
                  onClick={addPreviewImage}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg transition-colors flex items-center"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Add Image
                </button>
              </div>
              
              {formData.previewImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.previewImages.map((image, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      className="relative group bg-gray-50 rounded-lg p-2 border-2 border-dashed border-gray-200 hover:border-green-300 transition-colors cursor-move"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => removePreviewImage(index)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No preview images added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Featured Freebie</label>
                <p className="text-sm text-gray-500">Display this freebie prominently</p>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange('featured', !formData.featured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.featured ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.featured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {freebie ? 'Update Freebie' : 'Create Freebie'}
          </button>
        </div>
      </form>
    </div>
  );
};