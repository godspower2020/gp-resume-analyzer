const SpinnerLoading = ({ size = 23, color = "#fff" }) => {
    return (
        <div
            className="flex justify-center items-center"
            style={{ width: size, height: size }}
        >
            <div
                className="animate-spin rounded-full border-2 border-t-transparent"
                style={{
                    width: size,
                    height: size,
                    borderColor: color,
                    borderTopColor: "transparent",
                }}
            />
        </div>
    );
};

export default SpinnerLoading;
