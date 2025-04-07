import { describe, it, expect, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react'
import BillingList from './page';

describe('BillingList', () => {
  it('「請求一覧」が表示されていることを確認', () => {
    render(<BillingList />);
    expect(screen.getByText('請求一覧')).toBeInTheDocument();
  });
});