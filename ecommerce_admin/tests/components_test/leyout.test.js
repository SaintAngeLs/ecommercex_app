import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';

// Mocking the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('Layout', () => {
  test('renders login button when session is not available', () => {
    // Mocking the useSession hook to return null session data
    useSession.mockReturnValue({ data: null });

    render(<Layout>Hello World</Layout>);

    // Assert that the login button is rendered
    const loginButton = screen.getByRole('button', { name: 'Login with google' });
    expect(loginButton).toBeInTheDocument();
  });

  test('renders children when session is available', () => {
    // Mocking the useSession hook to return a dummy session data
    useSession.mockReturnValue({ data: { user: { name: 'John Doe' } } });

    render(<Layout>Hello World</Layout>);

    // Assert that the children content is rendered
    const childrenContent = screen.getByText('Hello World');
    expect(childrenContent).toBeInTheDocument();
  });

  test('renders Navbar when showNavbar prop is true', () => {
    useSession.mockReturnValue({ data: { user: { name: 'John Doe' } } });

    render(<Layout>Hello World</Layout>);

    // Assert that the Navbar component is rendered when showNavbar is true
    const navbar = screen.getByTestId('navbar-component');
    expect(navbar).toBeInTheDocument();
  });
});
