import React from 'react';
import { render } from '@testing-library/react';
import FilterItem from '../components/FilterItem';
import userEvent from '@testing-library/user-event';

describe('FilterItem', () => {
  test('it renders non-selected', () => {
    const { asFragment } = render(
      <FilterItem title="Adventure" selected={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('it renders selected', () => {
    const { asFragment } = render(<FilterItem title="Adventure" selected />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('it toggles', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <FilterItem title="Adventure" selected={false} onToggle={onToggle} />
    );
    userEvent.click(getByRole('button'));
    expect(onToggle.mock.calls.length).toBe(1);
    expect(onToggle.mock.calls[0][0]).toBe('Adventure'); //title arg
    expect(onToggle.mock.calls[0][1]).toBe(true); //selected arg (toggled)
  });
});
