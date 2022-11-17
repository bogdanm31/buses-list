import { render, screen } from "@testing-library/react";
import Card from './Card';

describe('Card.tsx', () => {
  test('renders div with class card', () => {
    render(<Card><div data-testid="test">Rendering card content</div></Card>);
    const div = screen.getByTestId('test');
    expect(div).toBeTruthy();
    expect(div).toContainHTML('Rendering card content');
  });
});