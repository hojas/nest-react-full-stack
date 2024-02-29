import { render } from '@testing-library/react';

import MarkdownEditor from './markdown-editor';

describe('MarkdownEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MarkdownEditor />);
    expect(baseElement).toBeTruthy();
  });
});
