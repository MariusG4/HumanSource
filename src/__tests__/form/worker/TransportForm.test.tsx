import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { useMutation } from '@apollo/client';
import { useCookies } from 'next-client-cookies';
import FormularSofer from '@/app/[lang]/form/worker/transport/page';

// Mock the necessary dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/i18n/client', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((key) => key),
  }),
}));

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn().mockReturnValue([jest.fn(), { loading: false }]),
}));

jest.mock('next-client-cookies', () => ({
  useCookies: jest.fn().mockReturnValue({
    get: jest.fn(),
    set: jest.fn(),
  }),
}));

jest.mock('@/utils/isDefaultLang', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((params, path) => `/${params.lang}${path}`),
}));

jest.mock('@/utils/scrollToTop', () => ({
  scrollToTop: jest.fn(),
}));

// Mock the form step components
jest.mock('@/components/Formular/sofer/pasi/1', () => ({
  __esModule: true,
  default: ({ setValue, setDisabled }: any) => (
    <div data-testid="step-1">
      <button 
        onClick={() => {
          setValue('tipRemorca', 'cisterna');
          setDisabled(false);
        }}
        data-testid="select-cisterna"
      >
        Select Cisterna
      </button>
    </div>
  ),
}));

jest.mock('@/components/Formular/sofer/pasi/2', () => ({
  __esModule: true,
  default: ({ register, setValue, setDisabled }: any) => (
    <div data-testid="step-2">
      <button 
        onClick={() => {
          setValue('vechime', '1-3 ani');
          setDisabled(false);
        }}
        data-testid="select-experience"
      >
        1-3 ani experienta
      </button>
    </div>
  ),
}));

// Mock the remaining step components similarly
const mockStepComponent = (stepNumber: number) => ({
  __esModule: true,
  default: ({ setValue, setDisabled }: any) => (
    <div data-testid={`step-${stepNumber}`}>
      <button 
        onClick={() => setDisabled(false)}
        data-testid={`select-option-${stepNumber}`}
      >
        Select Option
      </button>
    </div>
  ),
});

for (let i = 3; i <= 10; i++) {
  jest.mock(`@/components/Formular/sofer/pasi/${i}`, () => mockStepComponent(i));
}

// Mock the navigation component
jest.mock('@/components/Formular/NavigatieFormularSofer', () => ({
  __esModule: true,
  default: ({ next, back, isFirstStep, isLastStep, disabled }: any) => (
    <div data-testid="form-navigation">
      {!isFirstStep && (
        <button onClick={back} data-testid="back-button">
          Back
        </button>
      )}
      {isLastStep ? (
        <button 
          disabled={disabled} 
          data-testid="submit-button"
          type="submit"
        >
          Submit
        </button>
      ) : (
        <button 
          onClick={next} 
          disabled={disabled} 
          data-testid="next-button"
        >
          Next
        </button>
      )}
    </div>
  ),
}));

// Mock Breadcrumbs component
jest.mock('@/components/Breadcrumbs/Breadcrumbs', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="breadcrumbs">{children}</div>,
}));

describe('Transport Worker Form', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  
  const mockCookies = {
    get: jest.fn(),
    set: jest.fn(),
  };
  
  const mockAddTransportForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useCookies as jest.Mock).mockReturnValue(mockCookies);
    (useMutation as jest.Mock).mockReturnValue([mockAddTransportForm, { loading: false }]);
  });

  it('renders the first step of the transport form', () => {
    render(<FormularSofer params={{ lang: 'ro', country: 'ro' }} />);
    
    // Check if the first step is rendered
    expect(screen.getByTestId('step-1')).toBeInTheDocument();
    
    // Check if the navigation is rendered
    expect(screen.getByTestId('form-navigation')).toBeInTheDocument();
    
    // The back button should not be visible on the first step
    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
    
    // The next button should be disabled initially
    expect(screen.getByTestId('next-button')).toBeDisabled();
  });

  it('enables the next button when an option is selected', () => {
    render(<FormularSofer params={{ lang: 'ro', country: 'ro' }} />);
    
    // Initially the next button should be disabled
    expect(screen.getByTestId('next-button')).toBeDisabled();
    
    // Select an option in the first step
    fireEvent.click(screen.getByTestId('select-cisterna'));
    
    // Now the next button should be enabled
    expect(screen.getByTestId('next-button')).not.toBeDisabled();
  });

  it('navigates to the next step when next button is clicked', async () => {
    render(<FormularSofer params={{ lang: 'ro', country: 'ro' }} />);
    
    // Select an option in the first step
    fireEvent.click(screen.getByTestId('select-cisterna'));
    
    // Click the next button
    fireEvent.click(screen.getByTestId('next-button'));
    
    // Check if the second step is rendered
    await waitFor(() => {
      expect(screen.getByTestId('step-2')).toBeInTheDocument();
    });
    
    // The back button should now be visible
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('navigates back to the previous step when back button is clicked', async () => {
    render(<FormularSofer params={{ lang: 'ro', country: 'ro' }} />);
    
    // Go to step 2
    fireEvent.click(screen.getByTestId('select-cisterna'));
    fireEvent.click(screen.getByTestId('next-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('step-2')).toBeInTheDocument();
    });
    
    // Go back to step 1
    fireEvent.click(screen.getByTestId('back-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('step-1')).toBeInTheDocument();
    });
  });

  // This test would need to be expanded to go through all steps
  it('submits the form when completed', async () => {
    const { rerender } = render(<FormularSofer params={{ lang: 'ro', country: 'ro' }} />);
    
    // This is a simplified test that would need to be expanded
    // to go through all 10 steps of the form
    
    // For testing purposes, we'll just check that the mutation is called
    // when the form is submitted
    
    // Mock a form submission
    const mockSubmitEvent = { preventDefault: jest.fn() };
    const formElement = document.querySelector('form');
    if (formElement) {
      fireEvent.submit(formElement, mockSubmitEvent);
    }
    
    // In a real test, we would verify the mutation was called with the correct data
    // This is just a placeholder assertion
    expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();
  });
});