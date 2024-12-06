import React, { useState, useRef } from 'react';
import '../App.css'; // Adjusted import statement
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faTrash, faEdit, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import notesImage from './Notes2.webp'; // Assuming Notes2.webp is in the component folder

function Note() {
    const [note, setNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const noteTextArea = useRef(null);
    const fileInput = useRef(null);

    const handleCreateNote = () => {
        setNote('');
        setIsEditing(true);
        noteTextArea.current.focus();
    };

    const handleDeleteNote = () => {
        setNote('');
    };

    const handleEditNote = () => {
        setIsEditing(true);
        noteTextArea.current.focus();
    };

    const handleSaveNote = () => {
        setIsEditing(false);
    };

    const handleInsertImage = () => {
        fileInput.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                noteTextArea.current.appendChild(img);
                noteTextArea.current.appendChild(document.createElement('br'));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container-note">
            <h1>
                <img src={notesImage} alt="Notes" className="notes-image" />
                Notes
            </h1>

            <button className="btn" onClick={handleCreateNote}>
                <FontAwesomeIcon icon={faFeather} /> Create note
            </button>

            <div className="note-container" style={{ display: note || isEditing ? 'block' : 'none' }}>
                <div className="text-container">
                    <div
                        ref={noteTextArea}
                        contentEditable={isEditing}
                        className="note-text"
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: note }}
                        onInput={(e) => setNote(e.innerHTML)}
                    ></div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <div className="button-group">
                    <button className="action-btn" onClick={handleDeleteNote}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="action-btn" onClick={handleEditNote}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="action-btn" onClick={handleInsertImage}>
                        <FontAwesomeIcon icon={faImage} />
                    </button>
                    <button className="action-btn" onClick={handleSaveNote}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Note;
