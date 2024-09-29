import { render, screen } from "@testing-library/react";
import MainHeader from './MainHeader';

const hour = 14,
    minute = 30,
    timestamp = hour * 3600 + minute * 60;
const renderItem = () => render(<MainHeader />);

describe('MainHeader component', () => {
  test('renders logo', () => {
    renderItem();
    
    const logo = screen.getByTestId('logo');
    expect(logo).toBeTruthy();
  });

  test('renders clock with proper time', () => {
    renderItem();

    const clock = screen.getByTestId('clock');
    expect(clock).toBeTruthy();
    expect(clock.textContent).toBe(`${hour}:${minute}`);
  });
});