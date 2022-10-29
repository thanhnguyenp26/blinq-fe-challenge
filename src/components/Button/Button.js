import './styles.css';

function Button({ text, onClick, width, type, disabled }) {
  return (
    <button width={width} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
