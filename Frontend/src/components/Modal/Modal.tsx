
import CreateCategoryModal from '../CreateCategoryModal/CreateCategoryModal'
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal'
import CreateServerModal from '../CreateServerModal/CreateServerModal'
import DeleteServerModal from '../DeleteServerModal/DeleteServerModal'
import EditModal from '../EditModal/EditModal'
// import EditServerModal from '../EditServerModal/EditServerModal'
import ImagePreview from '../ImagePreview/ImagePreview'
import InviteModal from '../InviteModal/InviteModal'


function Modal() {

    return (
        <>
            <CreateServerModal />
            {/* <EditServerModal/> */}
            <InviteModal />
            <ImagePreview/>
            <CreateCategoryModal/>
            <CreateChannelModal/>
            <EditModal/>
            <DeleteServerModal/>
        </>
    )
}

export default Modal