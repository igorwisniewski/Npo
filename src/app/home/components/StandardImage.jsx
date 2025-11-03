// StandardImage.jsx
import React from 'react';

/**
 * Komponent StandardImage.
 * Prosty komponent do wyświetlania obrazów, używający tagu <img>.
 * Implementuje logikę "fill" dla object-fit.
 * * @param {object} props - Właściwości komponentu.
 * @param {string} props.src - Ścieżka do obrazka.
 * @param {string} props.alt - Tekst alternatywny.
 * @param {boolean} [props.fill=false] - Czy obraz ma wypełnić kontener (object-fit: cover).
 * @param {object} [props.style={}] - Dodatkowe style inline.
 * @param {string} [props.className=''] - Dodatkowe klasy CSS.
 */
const StandardImage = ({ src, alt, fill = false, style, className }) => {
    // Określenie, czy obraz ma wypełniać kontener (cover) czy mieścić się (contain/inne).
    const objectFit = fill ? 'cover' : (style?.objectFit || 'contain');

    return (
        <img
            src={src}
            alt={alt}
            // Ustawienie szerokości, wysokości i objectFit w stylu.
            style={{ ...style, width: '100%', height: '100%', objectFit }}
            className={className}
        />
    );
};

export default StandardImage;