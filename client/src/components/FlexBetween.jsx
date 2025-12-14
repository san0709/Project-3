const FlexBetween = ({ className = "", children, onClick }) => {
    return (
        <div
            className={`flex justify-between items-center ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default FlexBetween;
