const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainer = {
  display: "flex",
  gap:4,
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
};
export default function StarRating({ maxRating = 5 }) {
  return (
    <>
      <div style={containerStyle}>
        <div style={starContainer}>
          {Array.from({ maxRating }, (_, i) => (
            <span>S(i+1)</span>
          ))}
        </div>
        <p style={textStyle}></p>
      </div>
    </>
  );
}
