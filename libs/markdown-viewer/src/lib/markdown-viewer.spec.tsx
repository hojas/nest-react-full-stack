import { render } from '@testing-library/react';

import MarkdownViewer from './markdown-viewer';

describe('MarkdownViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MarkdownViewer />);
    expect(baseElement).toBeTruthy();
  });
});
