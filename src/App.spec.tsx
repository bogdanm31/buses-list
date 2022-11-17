import { render, screen } from "@testing-library/react";
import App from "./App";

describe('App.tsx', () => {
  test('it renders', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeTruthy();
    expect(main.childNodes.length).toBe(2);
  });
});