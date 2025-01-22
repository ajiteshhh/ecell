
const Card = ({ children, className }) => {
    return (
        <div className={`border rounded-3xl ${className}`}>
            {children}
        </div>
    );
};

export default Card;