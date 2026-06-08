function Button({text,type,onClick,disabled}) {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button;