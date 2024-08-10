import { DeleteForever } from "@mui/icons-material";
import { EditIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const useMenu = (onEdit, onDelete) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const menuItems = [
        { icon: <EditIcon fontSize="small" />, text: 'Edytuj wpis', onPress: () => { onEdit(); handleClose()} },
        { icon: <DeleteForever fontSize="small" />, text: 'Usuń wpis', onPress: () => { onDelete(); handleClose()} },
    ];

    return {
        handleClick,
        anchorEl,
        open,
        menuItems,
        handleClose
    }
}

export default useMenu;