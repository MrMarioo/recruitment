import React, { useState, useRef, useEffect, FC } from 'react';

import {
  Person,
  PersonAdd,
  PersonRemove,
  Block,
  BarChart,
  Code,
  Flag,
  ReportProblem,
  Message,
  DeleteForever,
} from '@mui/icons-material';
import { MoreHoriz, Favorite } from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Typography, Avatar, Card, CardContent, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CodeIcon, EditIcon } from 'lucide-react';
import useMenu from '@/src/hooks/useMenu.hook';
import RecApiCallerFactory from '@/src/services/RecApiCallerFactory';
import BasicModal from '@/src/components/modals/BasicModal.modal'; 
import EditPostModal from '@/src/components/modals/EditPost.modal';
import { TPostItemList } from '@/src/models/types/PostItemList.type';

const PostCard = styled(Card)({
  marginBottom: '10px',
  border: '1px solid #e6ecf0',
  borderRadius: '16px',
});

const PostHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
});

const PostContent = styled(CardContent)({
  padding: '0 16px',
});

const PostActions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 16px 8px',
});

const ActionButton = styled(IconButton)({
  '&:hover': {
    color: '#1da1f2',
  },
});

export const Post: FC<TPostItemList> = (props: TPostItemList) => {
  const apiFactory = new RecApiCallerFactory();
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const closeModal = (show: boolean) => {
    setShowModal(show);
    setTimeout(() => {
      console.log("TEST");
      window.location.reload();
    }, 500);
  }

  const deletePost = async () => {
    const response = await apiFactory.getApiImplementation("posts").deleteItem(props.post.id);
    if(response.status == 200)
    {
      setModalMessage("Usunieto post");
    }else setModalMessage("Napotkano problem");
    setShowModal(true);
  }
  const editPost = async (post) => {
    const response = await apiFactory.getApiImplementation("posts").updateItem(post.id,post);
    console.log(response)
    if(response.status == 200)
      {
        setModalMessage("Zmodyfikowano post");
      }else setModalMessage("Napotkano problem");
      setShowModal(true);
  }


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    handleClose();
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const { anchorEl, handleClick, menuItems, open, handleClose } = useMenu(handleOpenEditModal,deletePost);
  
  return (
    <PostCard>
      {showModal && 
        <BasicModal 
          setShow={closeModal}
          show={showModal}
        >
          <Typography variant='h6'>
            {modalMessage}
          </Typography>
        </BasicModal>
      }
      {isEditModalOpen &&
      <EditPostModal
        post={props.post}
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={editPost}
      />}
      <PostHeader>
        <Avatar sx={{ marginRight: 2 }}>{props.post.author[0]}</Avatar>
        <Box>
          <Typography variant="subtitle1" component="span" fontWeight="bold">
            {props.post.author}
          </Typography>
          <Typography variant="body2" component="span" color="text.secondary">
            {' '}
            {props.handle} · {props.time}
          </Typography>
        </Box>
        <IconButton
          sx={{ marginLeft: 'auto' }}
          onClick={handleClick}
          aria-controls={open ? 'context-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="context-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={item.onPress}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </PostHeader>
      <PostContent>
        <Typography variant="body1" paragraph>
          {props.post.body}
        </Typography>
      </PostContent>
      <PostActions>
        <ActionButton size="small">
          <Favorite fontSize="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            {props.likes}
          </Typography>
        </ActionButton>
      </PostActions>
    </PostCard>
  );
};
