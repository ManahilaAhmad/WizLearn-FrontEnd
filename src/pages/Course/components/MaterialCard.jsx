import React from 'react';
import { FaFileAlt, FaTrash, FaDownload, FaEye } from 'react-icons/fa';

const MaterialCard = ({ material, onDelete }) => {
    const { id, title, description, fileData, uploadDate } = material;

    const handleDownload = (e) => {
        e.stopPropagation();
        if (fileData) {
            const link = document.createElement('a');
            link.href = fileData.data;
            link.download = fileData.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleView = (e) => {
        e.stopPropagation();
        if (fileData) {
            // Open file in new tab
            window.open(fileData.data, '_blank');
        }
    };

    const isImage = fileData && fileData.type.startsWith('image/');
    const isPDF = fileData && fileData.type === 'application/pdf';

    return (
        <div className="material-card">
            <div className="material-header">
                <FaFileAlt className="material-icon" />
                <div className="material-info">
                    <h3 className="material-title">{title}</h3>
                    <p className="material-date">{uploadDate}</p>
                </div>
                <button className="material-delete-btn" onClick={() => onDelete(id)} title="Delete material">
                    <FaTrash />
                </button>
            </div>

            <div className="material-body">
                <p className="material-description">{description}</p>

                {fileData && (
                    <div className="material-file-container">
                        {/* Preview for images */}
                        {isImage && (
                            <div className="file-preview">
                                <img src={fileData.data} alt={title} className="preview-image" />
                            </div>
                        )}

                        {/* File info and actions */}
                        <div className="material-file">
                            <div className="file-info">
                                <FaFileAlt className="file-icon" />
                                <span className="file-name">{fileData.name}</span>
                                <span className="file-size">({(fileData.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <div className="file-actions">
                                {(isImage || isPDF) && (
                                    <button className="file-action-btn view-file-btn" onClick={handleView} title="View file">
                                        <FaEye /> View
                                    </button>
                                )}
                                <button className="file-action-btn download-file-btn" onClick={handleDownload} title="Download file">
                                    <FaDownload /> Download
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaterialCard;
