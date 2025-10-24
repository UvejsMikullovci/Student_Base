import React from 'react';
import "./ImageCard.css"

export function ImageCard({src, alt}) {
return <img className="image-card" src={src} alt={alt}/>;
}
