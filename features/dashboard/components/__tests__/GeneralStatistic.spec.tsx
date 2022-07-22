import { expect } from '@jest/globals';
import { render } from '@testing-library/react'
import GeneralStatistic from '../GeneralStatistic';

describe('GeneralStatistic', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it('renders correctly', () => {
    const { container } = render(
      <GeneralStatistic
        totalRequest={10}
        totalInvalidRequest={2}
        totalRequestPerMinute={4}
      />
    )

    expect(container).toMatchSnapshot()
  })
});