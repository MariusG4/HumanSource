import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import Formular from '@/app/[lang]/form/worker/page';

// Mock the necessary dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/i18n/client', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((key) => key),
  }),
}));

jest.mock('@/utils/isDefaultLang', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((params, path) => `/${params.lang}${path}`),
}));

// Mock SVG imports
jest.mock('../../../../../public/imagini/formular/selectDomeniu/negru/transport.svg', () => 'TransportIcon');
jest.mock('../../../../../public/imagini/formular/selectDomeniu/alb/transport.svg', () => 'TransportIconWhite');
jest.mock('../../../../../public/imagini/formular/selectDomeniu/negru/medical.svg', () => 'MedicalIcon');
jest.mock('../../../../../public/imagini/formular/selectDomeniu/alb/medical.svg', () => 'MedicalIconWhite');

// Mock the Breadcrumbs component
jest.mock('@/components/Breadcrumbs/Breadcrumbs', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="breadcrumbs">{children}</div>,
}));

describe('Worker Form Page', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the worker form page correctly', () => {
    render(<Formular params={{ lang: 'ro', country: 'ro' }} />);
    
    // Check if the title is rendered
    expect(screen.getByText('In ce domeniu vrei sa lucrezi?')).toBeInTheDocument();
    
    // Check if both category options are rendered
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Medical')).toBeInTheDocument();
    
    // Check if the continue button is disabled initially
    const continueButton = screen.getByText('CONTINUA');
    expect(continueButton).toBeInTheDocument();
    expect(continueButton.closest('button')).toBeDisabled();
  });

  it('enables the continue button when a category is selected', () => {
    render(<Formular params={{ lang: 'ro', country: 'ro' }} />);
    
    // Initially the button should be disabled
    const continueButton = screen.getByText('CONTINUA');
    expect(continueButton.closest('button')).toBeDisabled();
    
    // Click on the Transport category
    fireEvent.click(screen.getByText('Transport'));
    
    // Now the button should be enabled
    expect(continueButton.closest('button')).not.toBeDisabled();
  });

  it('navigates to the correct page when continue button is clicked', async () => {
    render(<Formular params={{ lang: 'ro', country: 'ro' }} />);
    
    // Select the Medical category
    fireEvent.click(screen.getByText('Medical'));
    
    // Click the continue button
    fireEvent.click(screen.getByText('CONTINUA'));
    
    // Check if router.push was called with the correct path
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/ro/form/worker/medical');
    });
  });

  it('changes the selected category when clicking on different options', () => {
    render(<Formular params={{ lang: 'ro', country: 'ro' }} />);
    
    // Select Transport
    fireEvent.click(screen.getByText('Transport'));
    
    // Check if Transport is selected (by checking if the background color changed)
    const transportButton = screen.getByText('Transport').closest('button');
    expect(transportButton).toHaveClass('bg-gri-brand');
    
    // Select Medical
    fireEvent.click(screen.getByText('Medical'));
    
    // Check if Medical is now selected
    const medicalButton = screen.getByText('Medical').closest('button');
    expect(medicalButton).toHaveClass('bg-gri-brand');
    
    // Transport should no longer be selected
    expect(transportButton).not.toHaveClass('bg-gri-brand');
  });
});