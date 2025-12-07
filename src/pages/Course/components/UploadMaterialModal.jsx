import React, { useState, useEffect } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';

const UploadMaterialModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fileName: ''
    });

    const [errors, setErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            setFormData({ title: '', description: '', fileName: '' });
            setSelectedFile(null);
            setErrors({});
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFormData(prev => ({
                ...prev,
                fileName: file.name
            }));
            if (errors.fileName) {
                setErrors(prev => ({ ...prev, fileName: '' }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Material title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let fileData = null;
        if (selectedFile) {
            const reader = new FileReader();
            fileData = await new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve({
                        name: selectedFile.name,
                        type: selectedFile.type,
                        size: selectedFile.size,
                        data: e.target.result
                    });
                };
                reader.readAsDataURL(selectedFile);
            });
        }

        onSubmit({
            ...formData,
            fileData
        });
        setFormData({ title: '', description: '', fileName: '' });
        setSelectedFile(null);
        setErrors({});
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="upload-material-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Upload Material</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="title">Material Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={`form-input ${errors.title ? 'input-error' : ''}`}
                            placeholder="e.g., Week 1 Lecture Notes"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                            placeholder="Describe the material..."
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Upload File (Optional)</label>
                        <div className="file-upload-container">
                            <input
                                type="file"
                                id="file"
                                className="file-input"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                            />
                            <label htmlFor="file" className="file-upload-label">
                                <FaUpload />
                                <span>{selectedFile ? selectedFile.name : 'Choose a file'}</span>
                            </label>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-done">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadMaterialModal;
