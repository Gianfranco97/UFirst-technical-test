import { expect } from '@jest/globals';
import { render } from '@testing-library/react'
import MainLayout from '../MainLayout';

describe('MainLayout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MainLayout><h1>Hello World</h1></MainLayout>
    )

    expect(container).toMatchSnapshot()
  })
});