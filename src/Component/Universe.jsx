import React, { useState, useRef, useEffect } from 'react';
import './Universe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faTrash, faImage, faSave, faTimes, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

const ORBIT_COUNT = 5;
const STAR_COLORS = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#98D8C8',
  '#F7FFF7', '#FF85A2', '#FFA62B', '#7FDBFF', '#2ECC71',
];

function Universe() {
    const [note, setNote] = useState('');
    const [stars, setStars] = useState([]);
    const [selectedStar, setSelectedStar] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState(['Work', 'Personal', 'Ideas']);
    const [selectedCategory, setSelectedCategory] = useState('Work');
    const noteRef = useRef(null);
    const fileInput = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDaytime, setIsDaytime] = useState(true);

    useEffect(() => {
        const savedStars = localStorage.getItem('stars');
        if (savedStars) {
            setStars(JSON.parse(savedStars));
        }

        const starInterval = setInterval(() => {
            setStars(prevStars => prevStars.map(star => ({
                ...star,
                angle: (star.angle + star.speed) % 360
            })));
        }, 50);

        const updateMoonPhase = () => {
            const currentHour = new Date().getHours();
            setIsDaytime(currentHour >= 6 && currentHour < 18);
        };

        updateMoonPhase();
        const moonInterval = setInterval(updateMoonPhase, 60000);

        return () => {
            clearInterval(starInterval);
            clearInterval(moonInterval);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('stars', JSON.stringify(stars));
    }, [stars]);

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
                noteRef.current.appendChild(img);
                noteRef.current.appendChild(document.createElement('br'));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveNote = () => {
        const orbitIndex = Math.floor(Math.random() * ORBIT_COUNT);
        const newStar = {
            id: Date.now(),
            content: noteRef.current.innerHTML,
            date: new Date().toLocaleString(),
            angle: Math.random() * 360,
            speed: 0.1 + Math.random() * 0.2,
            size: 4 + Math.random() * 4,
            orbit: orbitIndex,
            color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            category: selectedCategory
        };
        setStars([...stars, newStar]);
        setNote('');
        noteRef.current.innerHTML = '';
        setIsEditing(false);
    };

    const handleCreateNote = () => {
        setNote('');
        setIsEditing(true);
        setTimeout(() => noteRef.current.focus(), 0);
    };

    const handleDeleteNote = () => {
        setNote('');
        noteRef.current.innerHTML = '';
        setIsEditing(false);
    };

    const handleStarClick = (star) => {
        setSelectedStar(star);
    };

    const handleCloseStarContent = () => {
        setSelectedStar(null);
    };

    const handleEditStar = (star) => {
        setNote(star.content);
        setIsEditing(true);
        setSelectedStar(null);
        setTimeout(() => {
            noteRef.current.innerHTML = star.content;
            noteRef.current.focus();
        }, 0);
    };

    const getStarPosition = (angle, orbitIndex) => {
        const orbitRadius = 100 + orbitIndex * 30;
        const x = Math.cos(angle * Math.PI / 180) * orbitRadius;
        const y = Math.sin(angle * Math.PI / 180) * orbitRadius;
        return { x, y };
    };

    const filteredStars = stars.filter(star => 
        star.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="universe-container">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            <div className="universe-content">
                <div className="orbit-container">
                    {[...Array(ORBIT_COUNT)].map((_, index) => (
                        <div key={index} className={`orbit orbit-${index + 1}`}>
                            {filteredStars
                                .filter(star => star.orbit === index)
                                .map((star) => {
                                    const { x, y } = getStarPosition(star.angle, star.orbit);
                                    return (
                                        <div
                                            key={star.id}
                                            className="star"
                                            style={{
                                                transform: `translate(${x}px, ${y}px)`,
                                                width: `${star.size}px`,
                                                height: `${star.size}px`,
                                                backgroundColor: star.color,
                                                boxShadow: `0 0 10px 2px ${star.color}, 0 0 20px 4px ${star.color}`,
                                                animation: 'twinkle 1s infinite alternate'
                                            }}
                                            onClick={() => handleStarClick(star)}
                                        >
                                            <div className="star-date">{new Date(star.date).toLocaleDateString()}</div>
                                        </div>
                                    );
                                })}
                        </div>
                    ))}
                </div>

                <div className="note-section">
                    <h1 className="universe-title">Welcome to the Universe Agenda</h1>
                    <p className="universe-description">
                        Make your daily track by universe agenda
                    </p>

                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} />
                        <input 
                            type="text" 
                            placeholder="Search stars..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {isEditing ? (
                        <>
                            <div
                                ref={noteRef}
                                contentEditable={true}
                                className="note-text"
                                suppressContentEditableWarning={true}
                                onInput={(e) => setNote(e.currentTarget.innerHTML)}
                                placeholder="Write your notes here..."
                            ></div>

                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="category-select"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInput}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <div className="button-group">
                                <button onClick={handleInsertImage}>
                                    <FontAwesomeIcon icon={faImage} /> Insert Image
                                </button>
                                <button onClick={handleSaveNote}>
                                    <FontAwesomeIcon icon={faSave} /> Save as Star
                                </button>
                                <button onClick={handleDeleteNote}>
                                    <FontAwesomeIcon icon={faTrash} /> Clear Note
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="button-group">
                            <button onClick={handleCreateNote}>
                                <FontAwesomeIcon icon={faFeather} /> Create Note
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {selectedStar && (
                <div className="star-content" style={{ backgroundColor: selectedStar.color + 'e6' }}>
                    <button className="close-button" onClick={handleCloseStarContent}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <h3>Note from {selectedStar.date}</h3>
                    <p>Category: {selectedStar.category}</p>
                    <div dangerouslySetInnerHTML={{ __html: selectedStar.content }}></div>
                    <button className="edit-button" onClick={() => handleEditStar(selectedStar)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                </div>
            )}

            <div className="planet"></div>
            <div className={`moon ${isDaytime ? 'moon-day' : 'moon-night'}`}></div>
            <div className="asteroid"></div>
        </div>
    );
}

export default Universe;

