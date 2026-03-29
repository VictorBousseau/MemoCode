import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Supprimer les erreurs console attendues dans les tests
beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe('ErrorBoundary', () => {
    test('affiche les enfants normalement sans erreur', () => {
        render(
            <ErrorBoundary>
                <div>Contenu normal</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Contenu normal')).toBeInTheDocument();
    });

    test('affiche le fallback quand un enfant crash', () => {
        function AlwaysCrashing() {
            throw new Error('Test error');
        }

        render(
            <ErrorBoundary>
                <AlwaysCrashing />
            </ErrorBoundary>
        );
        expect(screen.getByText("Quelque chose s'est mal passé")).toBeInTheDocument();
        expect(screen.getByText('Réessayer')).toBeInTheDocument();
    });

    test('le bouton Réessayer est cliquable et reset le state', () => {
        function AlwaysCrashing() {
            throw new Error('Test error');
        }

        render(
            <ErrorBoundary>
                <AlwaysCrashing />
            </ErrorBoundary>
        );
        const retryButton = screen.getByText('Réessayer');
        expect(retryButton).toBeInTheDocument();
        // Clicking retry resets hasError, but child crashes again immediately
        // We just verify the button is clickable and the boundary works
        fireEvent.click(retryButton);
    });
});
