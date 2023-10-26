export default function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>⛔</span> {error}
    </p>
  );
}
