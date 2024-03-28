type Props = {
    message: string;
    type: string;
};
export default function Toast({ message, type }: Props) {
    const bgColor: { [key: string]: string } = {
        info: "blue-500",
        success: "green-500",
        warning: "yellow-500",
        error: "red-500",
    };
    return (
        <div className="toast toast-top toast-end">
            <div
                className={`alert bg-${bgColor[type]} text-white drop-shadow-lg`}
            >
                <span>{message.toUpperCase()}</span>
            </div>
        </div>
    );
}
