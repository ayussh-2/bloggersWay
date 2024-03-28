type Props = {
    message: string;
    type: "info" | "success" | "warning" | "error";
};
export default function Toast({ message, type }: Props) {
    return (
        <div className="toast toast-top toast-end">
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    );
}
