import React from 'react';

import { vi, describe, it, expect, beforeEach } from 'vitest';

import * as useMenuModule from '@/src/hooks/useMenu.hook';
import RecApiCallerFactory from '@/src/services/RecApiCallerFactory';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { TPostItemList } from '../models/types/PostItemList.type';

import { Post } from '../design-system/Post/Post';

vi.mock('@/src/services/RecApiCallerFactory');
vi.mock('@/src/components/modals/BasicModal.modal', () => ({
  default: ({ children }) => <div data-testid="basic-modal">{children}</div>,
}));
vi.mock('@/src/components/modals/EditPost.modal', () => ({
  default: ({ onClose, onSave }) => (
    <div data-testid="edit-post-modal">
      <button onClick={() => onSave({ id: '1', body: 'Updated post' })}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('Post', () => {
  const mockPost: TPostItemList = {
    post: {
      id: '1',
      author: 'User@mail.com',
      body: 'test',
      created: Date.now(),
      edited: Date.now(),
    },
    handle: '@testauthor',
    time: '2h',
    likes: '10',
  };

  let mockHandleOpenEditModal: () => void;
  let mockDeletePost: () => void;

  beforeEach(() => {
    vi.resetAllMocks();
    mockHandleOpenEditModal = vi.fn();
    mockDeletePost = vi.fn();

    const mockUseMenu = vi.spyOn(useMenuModule, 'default');
    mockUseMenu.mockReturnValue({
      anchorEl: null,
      handleClick: vi.fn(),
      menuItems: [
        { icon: <div>Edit</div>, text: 'Edytuj wpis', onPress: mockHandleOpenEditModal },
        { icon: <div>Delete</div>, text: 'Usuń wpis', onPress: mockDeletePost },
      ],
      open: false,
      handleClose: vi.fn(),
    });
  });

  it('renders post content correctly', () => {
    render(<Post {...mockPost} />);
    expect(screen.getByText('User@mail.com')).toBeDefined();
    expect(screen.getByText('test')).toBeDefined();
    expect(screen.getByText('10')).toBeDefined();
  });

  it('opens context menu on more options click', async () => {
    const { rerender } = render(<Post {...mockPost} />);

    const moreButton = screen.getByTestId('MoreHorizIcon');
    fireEvent.click(moreButton);

    // Rerender with open menu
    const mockUseMenu = vi.spyOn(useMenuModule, 'default');
    mockUseMenu.mockReturnValue({
      anchorEl: document.body,
      handleClick: vi.fn(),
      menuItems: [
        { icon: <div>Edit</div>, text: 'Edytuj wpis', onPress: mockHandleOpenEditModal },
        { icon: <div>Delete</div>, text: 'Usuń wpis', onPress: mockDeletePost },
      ],
      open: true,
      handleClose: vi.fn(),
    });
    rerender(<Post {...mockPost} />);

    await waitFor(() => {
      expect(screen.getByText('Edytuj wpis')).toBeDefined();
      expect(screen.getByText('Usuń wpis')).toBeDefined();
    });
  });

  it('opens edit modal when edit option is clicked', async () => {
    const { rerender } = render(<Post {...mockPost} />);

    const moreButton = screen.getByTestId('MoreHorizIcon');
    fireEvent.click(moreButton);
    const mockUseMenu = vi.spyOn(useMenuModule, 'default');
    mockUseMenu.mockReturnValue({
      anchorEl: document.body,
      handleClick: vi.fn(),
      menuItems: [
        { icon: <div>Edit</div>, text: 'Edytuj wpis', onPress: mockHandleOpenEditModal },
        { icon: <div>Delete</div>, text: 'Usuń wpis', onPress: mockDeletePost },
      ],
      open: true,
      handleClose: vi.fn(),
    });
    rerender(<Post {...mockPost} />);

    const editButton = await screen.findByText('Edytuj wpis');
    fireEvent.click(editButton);

    expect(mockHandleOpenEditModal).toHaveBeenCalled();
  });

  it('deletes post and shows success modal', async () => {
    const mockDeleteItem = vi.fn().mockResolvedValue({ status: 200 });
    vi.mocked(RecApiCallerFactory).mockReturnValue({
      getApiImplementation: vi.fn().mockReturnValue({
        deleteItem: mockDeleteItem,
      }),
    });

    const { rerender } = render(<Post {...mockPost} />);

    const moreButton = screen.getByTestId('MoreHorizIcon');
    fireEvent.click(moreButton);

    // Rerender with open menu
    const mockUseMenu = vi.spyOn(useMenuModule, 'default');
    mockUseMenu.mockReturnValue({
      anchorEl: document.body,
      handleClick: vi.fn(),
      menuItems: [
        { icon: <div>Edit</div>, text: 'Edytuj wpis', onPress: mockHandleOpenEditModal },
        { icon: <div>Delete</div>, text: 'Usuń wpis', onPress: mockDeletePost },
      ],
      open: true,
      handleClose: vi.fn(),
    });
    rerender(<Post {...mockPost} />);

    const deleteButton = await screen.findByText('Usuń wpis');
    fireEvent.click(deleteButton);
  });
});
