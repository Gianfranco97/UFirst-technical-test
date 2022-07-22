import { expect } from '@jest/globals';
import { render } from '@testing-library/react'
import LoadingFullPage from '../LoadingFullPage';

describe('LoadingFullPage', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LoadingFullPage />
    )

    expect(container).toMatchSnapshot()
  })
});