import { useState } from "react";

const containerstyle = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
  maxWidth: "30px",
};

const starContainerStyle = {
  display: "flex",
};

export function StarRating({
  setMovieRating,
  maxRating,
  color = "#fcc419",
  size = "48",
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const handleRate = (rating) => {
    setRating(rating);
    setMovieRating(rating);
  };

  const textStyle = {
    lineHight: "1",
    marginBotom: "5px",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={containerstyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => {
              handleRate(i + 1);
            }}
            full={tempRating >= i + 1 || rating >= i + 1}
            onHoverin={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating("")}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

export function Star({ full, onRate, onHoverin, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    heith: `${size}px`,
    cursor: "pointer",
    color: "#fcc419",
  };
  return (
    <div
      style={starStyle}
      role="button"
      onClick={onRate}
      onMouseEnter={onHoverin}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </div>
  );
}
