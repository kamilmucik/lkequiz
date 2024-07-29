import { render, screen } from '@testing-library/react';
import React from 'react';

import App from '../../App';

// test('renders learn react link', () => {
//   // render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });
describe ("App component", () => {
  it ("should render app with error", () => {
    const {asFragment} = render (<App />);

    expect (asFragment()).toMatchSnapshot();
  });
});
