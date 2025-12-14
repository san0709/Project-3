const WidgetWrapper = ({ children, className = "" }) => {
    return (
        <div
            className={`p-6 bg-white dark:bg-neutral-dark rounded-2xl ${className} shadow-md`}
        >
            {children}
        </div>
    );
};

export default WidgetWrapper;
