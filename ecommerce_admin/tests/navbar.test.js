import Navbar from '@/components/Navbar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Navbar', () => {
  test('renders the navbar links', () => {
    render(<Navbar show={true} />);

    // Check if the links are rendered
    const dashboardLink = screen.getByText('Dashboard');
    const productsLink = screen.getByText('Products');
    const categoriesLink = screen.getByText('Categories');
    const ordersLink = screen.getByText('Orders');
    const settingsLink = screen.getByText('Settings');
    const logoutButton = screen.getByText('Logout');

    expect(dashboardLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(categoriesLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('changes active link when clicked', () => {
    render(<Navbar show={true} />);

    // Get the dashboard and products links
    const dashboardLink = screen.getByText('Dashboard');
    const productsLink = screen.getByText('Products');

    // Check if the dashboard link is active by default
    expect(dashboardLink).toHaveClass('bg-white');

    // Click on the products link
    userEvent.click(productsLink);

    // Check if the products link becomes active
    expect(productsLink).toHaveClass('bg-white');
    expect(dashboardLink).not.toHaveClass('bg-white');
  });

  test('calls logout function when logout button is clicked', () => {
    const mockLogout = jest.fn();
    render(<Navbar show={true} />, {
      // Provide a mock implementation for signOut function
      // and router.push function
      wrapper: ({ children }) => (
        <MockAuthProvider signOut={mockLogout}>
          {children}
        </MockAuthProvider>
      ),
    });

    // Get the logout button
    const logoutButton = screen.getByText('Logout');

    // Click on the logout button
    userEvent.click(logoutButton);

    // Check if the logout function is called
    expect(mockLogout).toHaveBeenCalled();
  });
});
