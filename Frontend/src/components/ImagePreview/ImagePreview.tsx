import {
    Modal,
    ModalContent,
} from "@nextui-org/react";
import { useModalStore } from "../../zustand/modal store/ModalStore";
import { memo } from "react";


const ImagePreview = memo(Preview)

function Preview() {
    const ImagePreviewModal = useModalStore((state) => state.ImagePreviewModal);
    const setImagePreviewModal = useModalStore((state) => state.setImagePreviewModal);



    console.log('render')
    return (
        <div>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={ImagePreviewModal.show}
                onOpenChange={() => setImagePreviewModal('')}
                backdrop="transparent"
                radius="sm"
                size="3xl"
            >
                <ModalContent className="bg-[#111214]">

                    <div className="p-2 py-3 flex flex-col gap-2 mt-5 mb-2">
                        {ImagePreviewModal.image && <img src={ImagePreviewModal.image} alt="preview-image" />}
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ImagePreview;
