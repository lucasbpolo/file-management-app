import { render, screen, fireEvent } from '@testing-library/react';
import { FileTable } from './FileTable';
import { FileItem } from '@monorepo-app/shared-data';

// Mock @tanstack/react-virtual
jest.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: jest.fn(() => ({
    getVirtualItems: () => [
      { index: 0, size: 50, start: 0 },
      { index: 1, size: 50, start: 50 },
      { index: 2, size: 50, start: 100 },
    ],
    getTotalSize: () => 150,
    measureElement: jest.fn(),
  })),
}));

const mockData: FileItem[] = [
  {
    name: 'test1.exe',
    device: 'Device1',
    path: '\\Device\\HarddiskVolume1\\test1.exe',
    status: 'available',
  },
  {
    name: 'test2.exe',
    device: 'Device2',
    path: '\\Device\\HarddiskVolume1\\test2.exe',
    status: 'scheduled',
  },
  {
    name: 'test3.exe',
    device: 'Device3',
    path: '\\Device\\HarddiskVolume1\\test3.exe',
    status: 'available',
  },
];

describe('FileTable', () => {
  it('should render loading state', () => {
    render(<FileTable data={[]} loading={true} />);

    const loadingContainer = screen.getByRole('status');

    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer.querySelector('.spinner')).toBeInTheDocument();
  });

  it('should render error state', () => {
    render(<FileTable data={[]} error="Test error" />);

    expect(screen.getByText(/Error loading data/)).toBeInTheDocument();
  });

  it('should render empty state', () => {
    render(<FileTable data={[]} loading={false} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render table with data', () => {
    render(<FileTable data={mockData} loading={false} />);

    expect(screen.getByText('test1.exe')).toBeInTheDocument();
    expect(screen.getByText('test2.exe')).toBeInTheDocument();
    expect(screen.getByText('test3.exe')).toBeInTheDocument();
  });

  it('should disable checkboxes for scheduled items', () => {
    render(<FileTable data={mockData} loading={false} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const itemCheckboxes = checkboxes.slice(1);
    const scheduledCheckbox = itemCheckboxes[1];

    expect(scheduledCheckbox).toBeDisabled();
  });

  it('should enable checkboxes for available items', () => {
    render(<FileTable data={mockData} loading={false} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const itemCheckboxes = checkboxes.slice(1);
    const availableCheckbox = itemCheckboxes[0];

    expect(availableCheckbox).not.toBeDisabled();
  });

  it('should select item when checkbox is clicked', () => {
    render(<FileTable data={mockData} loading={false} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const availableCheckbox = checkboxes[1];

    fireEvent.click(availableCheckbox);

    expect(availableCheckbox).toBeChecked();
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  it('should select all available items when select-all is clicked', () => {
    render(<FileTable data={mockData} loading={false} />);

    const selectAllCheckbox = screen.getByLabelText(
      'Select all available items',
    );

    fireEvent.click(selectAllCheckbox);

    expect(selectAllCheckbox).toBeChecked();
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('should show indeterminate state when some items are selected', () => {
    render(<FileTable data={mockData} loading={false} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const availableCheckbox = checkboxes[1];

    fireEvent.click(availableCheckbox);

    const selectAllCheckbox = screen.getByLabelText(
      'Select all available items',
    ) as HTMLInputElement;

    expect(selectAllCheckbox.indeterminate).toBe(true);
  });

  it('should call alert when download button is clicked', () => {
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => undefined);

    render(<FileTable data={mockData} loading={false} />);

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[1]);

    const downloadButton = screen.getByText('Download Selected');

    fireEvent.click(downloadButton);

    expect(alertSpy).toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it('should disable download button when no items are selected', () => {
    render(<FileTable data={mockData} loading={false} />);

    const downloadButton = screen.getByText('Download Selected');

    expect(downloadButton).toBeDisabled();
    expect(downloadButton).toHaveClass('downloadLink', 'disabled');
  });
});
