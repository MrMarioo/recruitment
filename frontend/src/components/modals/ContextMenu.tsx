import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, User, UserPlus, UserMinus, Ban, BarChart2, Code, Flag, AlertTriangle, MessageSquare, MoreHorizontal } from 'lucide-react';
import { MoreHoriz } from '@mui/icons-material';

export const ContextMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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
  const menuItems = [
    { icon: <User className="w-5 h-5" />, text: "Nie interesuje mnie ten wpis" },
    { icon: <User className="w-5 h-5" />, text: "Obserwuj @nord_nordic" },
    { icon: <UserPlus className="w-5 h-5" />, text: "Dodaj/usuń użytkownika @nord_nordic do/z List" },
    { icon: <UserMinus className="w-5 h-5" />, text: "Wycisz @nord_nordic" },
    { icon: <Ban className="w-5 h-5" />, text: "Zablokuj @nord_nordic" },
    { icon: <BarChart2 className="w-5 h-5" />, text: "Wyświetl interakcje dla wpisu wpis" },
    { icon: <Code className="w-5 h-5" />, text: "Osadź wpis" },
    { icon: <Flag className="w-5 h-5" />, text: "Zgłoś wpis" },
    { icon: <AlertTriangle className="w-5 h-5" />, text: "Zgłoś treści nielegalne w UE" },
    { icon: <MessageSquare className="w-5 h-5" />, text: "Zażądaj uwagi społeczności" },
  ];

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                <span>{item.text}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}