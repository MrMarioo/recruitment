
import BasicModal from '@/src/components/modals/BasicModal.modal'; 
import HNewPost from '@/src/hooks/NewPost.hook';
import { TNewPost } from '@/src/models/types/NewPost.type';
import { Image, GifBox, PollOutlined, EmojiEmotions, LocationOn } from '@mui/icons-material';
import { TextField, Button, Avatar, IconButton, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';

const NewPostPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
  
  const NewPostInput = styled(TextField)({
    '& .MuiInputBase-input': {
      height: 'auto',
    },
  });
  
  const NewPostActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  }));
  
  const NewPostButton = styled(Button)({
    borderRadius: '20px',
  });
  
  export const NewPost: FC<TNewPost> = (props: TNewPost) => {
    const [showModal, setShowModal] = useState(false);
    const { dispatch, handleContentChange, newPostData, handleAddPost} = HNewPost();
    
    const addPost = () => {
      handleAddPost();
      setShowModal(true);
    }

    const closeModal = (show: boolean) => {
      setShowModal(show);
      window.location.reload();
    }

    // - for future
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const files = Array.from(event.target.files || []);
    
    //   files.forEach((file: File) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       if (typeof reader.result === 'string') {
    //         const fakeEvent = {
    //           target: {
    //             value: reader.result
    //           }
    //         } as React.ChangeEvent<HTMLInputElement>;
    //         handleContentChange('base64')(fakeEvent);
    //       }
    //     };
    //     reader.onerror = (error) => {
    //       console.error('Error converting file to base64:', error);
    //     };
    //   });
    // };


    return(
    <NewPostPaper elevation={0}>
      {showModal && 
        <BasicModal 
          setShow={closeModal}
          show={showModal}
        >
          <Typography variant='h6'>
            Post added
          </Typography>
        </BasicModal>
      }
      <Box display="flex" alignItems="flex-start">
        <Avatar sx={{ marginRight: 2 }}>U</Avatar>
        <Box flexGrow={1}>
          <NewPostInput
            fullWidth
            multiline
            variant="standard"
            placeholder="Co się dzieje?!"
            InputProps={{
              disableUnderline: true,
            }}
            value={newPostData.body}
            onChange={handleContentChange('body')}
          />
          <NewPostActions>
            <NewPostButton variant="contained" color="primary" onClick={addPost} >
              Opublikuj wpis
            </NewPostButton>
          </NewPostActions>
        </Box>
      </Box>
    </NewPostPaper>
          )
  };