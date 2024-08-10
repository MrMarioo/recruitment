import React, { useState, useEffect } from 'react';
import { 
  Modal, Fade, Box, Typography,
  TextField, Button, useTheme, useMediaQuery
} from '@mui/material';
import { TPostData } from '@/src/models/types/PostData.type';

const EditPostModal = ({ post, open, onClose, onSave }) => {
  const [editedPost, setEditedPost] = useState<TPostData>(post);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setEditedPost(post);
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value, edited: Date.now() }));
  };

  const handleSave = () => {
    onSave(editedPost);
    onClose();
  };

  const getModalStyle = () => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '95%' : 400,
    maxWidth: '95%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: isMobile ? 2 : 4,
    borderRadius: 2,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={getModalStyle()}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edytuj post
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            name="body"
            label="Treść posta"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedPost.body}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>Anuluj</Button>
            <Button onClick={handleSave} variant="contained">Zapisz</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
export default EditPostModal;