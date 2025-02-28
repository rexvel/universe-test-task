import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <span className="text-8xl" role="img" aria-label="Sad face">😞</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
            <p className="mb-4 text-gray-700">An error occurred in the application.</p>
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Error details</summary>
              <p className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">{this.state.error?.message}</p>
            </details>
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
