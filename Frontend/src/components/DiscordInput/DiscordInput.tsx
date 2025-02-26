
import React, { useRef, useState } from 'react';
import PluseIconForInput from '../icons svgs/PluseIconForInput';
import StickerIcon from '../icons svgs/StickerIcon';
import EmojiIcon from '../icons svgs/EmojiIcon';
import { Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { getPresignedUrl, uploadImageToAWS } from '../../Apis/s3';
import { useAuthStore } from '../../zustand/auth store/AuthStore';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../../zustand/socket/useSocketContext';

const DiscordInput: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const token = useAuthStore((state) => state.token) || '';
  const user = useAuthStore((state) => state.user) || '';
  const socket = useSocketContext((state) => state.socket);

  const { serverId } = useParams();
  const { channelId } = useParams();

  // Adjust the height of the textarea dynamically
  const handleInputChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on content
    }
  };

  async function handleSubmit(body: string, image: File | null) {
    let fileUrl = null;
    if(image) {
        const preSignedUrl = await queryClient.fetchQuery({
            queryKey: ['getPresignedUrl'],
            queryFn: () => getPresignedUrl({ token }),
        });

        console.log('Presigned url', preSignedUrl);

        const responseAws = await uploadImageToAWS({
            url: preSignedUrl,
            file: image
        });
        console.log("file upload success", responseAws);
        fileUrl = preSignedUrl.split('?')[0];
    }
    socket?.emit('NewMessage', {
        channelId: channelId,
        body,
        image: fileUrl,
        senderId: user,
        serverId: serverId
    }, (data: unknown) => {
        console.log('Message sent', data);
        if(textareaRef.current){
          textareaRef.current.value = "";
          setImage(null)
        }
    });
  }


  return (
    <div className="relative flex items-start bg-[#383A40] text-white rounded-lg px-4 py-3 shadow-md mt-auto mb-5 m-3">
      {/* Left Button (Attachment) */}
      <button
        className="text-gray-400 hover:text-white focus:outline-none mr-2"
        title="Add Attachments"
      >
        <div onClick={() => {
          imageInputRef.current?.click();
        }}>
          <PluseIconForInput />
        </div>
        <input
          type="file"
          accept='image/png'
          className='hidden'
          ref={imageInputRef}
          onChange={(e) => {
            if (!e.target.files) {
              return;
            }
            setImage(e.target.files[0])
          }}
        />
      </button>

      {/* Text Input / Text Area */}
        {image && <div className='absolute  left-0 -top-20 flex border border-[#666] p-2 rounded-xl'>
          <img className='w-24' src={URL.createObjectURL(image)} alt="image" />
          <Trash2 className='text-red-500 w-4 cursor-pointer'
           onClick={()=>setImage(null)}
           />
        </div>}
        <textarea
          ref={textareaRef}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key == "Enter" && textareaRef.current?.value.trim()) {
              handleSubmit(textareaRef.current?.value.trim(), image)
            }
          }}
          className="w-full flex-1 bg-transparent resize-none border-none outline-none text-sm placeholder-gray-400 max-h-40 overflow-y-auto scrollbar-none"
          placeholder="Message"
          rows={1}
        ></textarea>

      {/* <div
        role='textbox'
        contentEditable
        onChange={(e)=> console.log(e.target)}
        className="flex-1 bg-transparent resize-none border-none outline-none text-sm placeholder-gray-400  overflow-y-auto scrollbar-none"
      ></div> */}

      {/* Right Buttons */}
      <div className="flex items-center space-x-2 ml-2">
        <StickerIcon />
        <EmojiIcon />
      </div>
    </div>
  );
};

export default DiscordInput;
