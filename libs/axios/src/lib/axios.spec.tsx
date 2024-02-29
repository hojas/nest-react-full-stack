import { render } from '@testing-library/react';

import Axios from './axios';

describe('Axios', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Axios />);
    expect(baseElement).toBeTruthy();
  });
});
