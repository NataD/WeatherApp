import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Toast from '../Toast';
import {AlertObject, AlertType} from '@/store/reducers/alertSlice';

describe('Toast Component', () => {
    jest.useFakeTimers();

    const mockRemoveAlert = jest.fn();

    it('should display alerts', () => {
        const alerts = [
            {
                id: '1',
                type: AlertType.SUCCESS,
                message: 'This is a success alert',
                displayFor: 5000,
            },
            {
                id: '2',
                type: AlertType.ERROR,
                message: 'This is an error alert',
                displayFor: 5000,
            },
        ];

        render(<Toast alerts={alerts} removeAlert={mockRemoveAlert} />);

        expect(screen.getByText('This is a success alert')).toBeTruthy();

        expect(screen.getByText('This is an error alert')).toBeTruthy();
    });

    it('should remove alerts after displayFor duration', async () => {
        const alerts = [
            {
                id: '1',
                type: AlertType.SUCCESS,
                message: 'This is a success alert',
                displayFor: 5000,
            },
        ];

        render(<Toast alerts={alerts} removeAlert={mockRemoveAlert} />);

        expect(screen.getByText('This is a success alert')).toBeTruthy();
    });

    it('should not render when there are no alerts', () => {
        const alerts: AlertObject[] = [];

        render(<Toast alerts={alerts} removeAlert={mockRemoveAlert} />);

        expect(screen.queryByText('This is a success alert')).toBeNull();
        expect(screen.queryByText('This is an error alert')).toBeNull();
    });
});
