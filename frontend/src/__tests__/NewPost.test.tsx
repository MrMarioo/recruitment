import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NewPost } from '../design-system/NewPost/NewPost'; 
import * as HNewPost from '@/src/hooks/NewPost.hook';
import { addPost, updateNewPost } from '@/src/redux/reducers/newPost.reducers';
import { TPostData } from '@/src/models/types/PostData.type';


vi.mock('@/src/hooks/NewPost.hook', () => ({
  default: vi.fn(),
}));


vi.mock('@/src/components/modals/BasicModal.modal', () => ({
  default: ({ children, setShow }: { children: React.ReactNode, setShow: (show: boolean) => void }) => (
    <div data-testid="basic-modal" onClick={() => setShow(false)}>{children}</div>
  ),
}));


vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid'
}));

const mockStore = configureStore([]);

describe('NewPost Component', () => {
  let store;
  const initialState = {
    posts: {
      newPost: {
        body: '',
        author: '',
        id: '',
        created: 0,
        edited: 0,
      } as TPostData,
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    vi.mocked(HNewPost.default).mockReturnValue({
      dispatch: store.dispatch,
      handleContentChange: vi.fn((field) => (event) => {
        store.dispatch(updateNewPost({ [field]: event.target.value }));
      }),
      newPostData: initialState.posts.newPost,
      handleAddPost: vi.fn(() => {
        const newPost: TPostData = {
          body: initialState.posts.newPost.body,
          author: "User@mail.com",
          id: 'mocked-uuid',
          created: Date.now(),
          edited: Date.now(),
        };
        store.dispatch(addPost(newPost));
      }),
    });
  });

  const renderWithRedux = (component) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  it('renders without crashing', () => {
    renderWithRedux(<NewPost />);
    expect(screen.getByPlaceholderText('Co się dzieje?!')).toBeInTheDocument();
  });

  it('displays avatar', () => {
    renderWithRedux(<NewPost />);
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('calls handleContentChange when input changes', async () => {
    renderWithRedux(<NewPost />);
    const input = screen.getByPlaceholderText('Co się dzieje?!');
    await fireEvent.change(input, { target: { value: 'New post content' } });
    const actions = store.getActions();
    expect(actions).toContainEqual(updateNewPost({ body: 'New post content' }));
  });

  it('calls handleAddPost when "Opublikuj wpis" button is clicked', async () => {
    vi.useFakeTimers();
    const now = new Date(2023, 5, 15).getTime();
    vi.setSystemTime(now);

    renderWithRedux(<NewPost />);
    const button = screen.getByText('Opublikuj wpis');
    await fireEvent.click(button);
    const actions = store.getActions();
    expect(actions).toContainEqual(addPost({
      body: '',
      author: 'User@mail.com',
      id: 'mocked-uuid',
      created: now,
      edited: now,
    }));

    vi.useRealTimers();
  });

  it('shows modal after post is added', async () => {
    renderWithRedux(<NewPost />);
    const button = screen.getByText('Opublikuj wpis');
    await fireEvent.click(button);
    expect(await screen.findByTestId('basic-modal')).toBeInTheDocument();
    expect(screen.getByText('Post added')).toBeInTheDocument();
  });

  it('reloads the page when modal is closed', async () => {
    const reloadMock = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      reload: reloadMock,
    });

    renderWithRedux(<NewPost />);
    const button = screen.getByText('Opublikuj wpis');
    await fireEvent.click(button);
    
    const modal = await screen.findByTestId('basic-modal');
    await fireEvent.click(modal); // Simulating closing the modal

    expect(reloadMock).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('does not show modal initially', () => {
    renderWithRedux(<NewPost />);
    expect(screen.queryByTestId('basic-modal')).not.toBeInTheDocument();
  });

  it('applies correct styles to NewPostButton', () => {
    renderWithRedux(<NewPost />);
    const button = screen.getByText('Opublikuj wpis');
    expect(button).toHaveStyle('border-radius: 20px');
  });
});