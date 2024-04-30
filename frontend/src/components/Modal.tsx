export default function Modal({
    title,
    btntype,
    modalBtnText,
    functionToPerform,
}: {
    title: string;
    btntype: string;
    modalBtnText: React.ReactNode;
    functionToPerform: () => void;
}) {
    return (
        <div className="z-50">
            <label htmlFor="my_modal_6" className={btntype}>
                {modalBtnText}
            </label>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal p-3" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>

                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">
                            Cancel
                        </label>
                        <label
                            className="btn btn-error"
                            htmlFor="my_modal_6"
                            onClick={functionToPerform}
                        >
                            Confirm
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
