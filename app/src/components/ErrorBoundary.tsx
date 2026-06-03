import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-lightbg p-8">
          <div className="max-w-lg text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Une erreur est survenue</h2>
            <p className="text-[#475569] mb-6">
              Veuillez rafraichir la page ou reessayer plus tard.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-magenta hover:bg-magenta-light text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Rafraichir la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}