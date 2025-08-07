import { inject, Injectable } from '@angular/core';
import {
  CreateBookingUseCase,
  ConfirmBookingUseCase,
  GetUserBookingsUseCase,
  CreateBookingCommand,
  CreateBookingResult,
} from '../application';
import { Booking } from '../domain';

/**
 * Presentation Facade - Booking Facade
 *
 * Provides a simplified interface for the presentation layer
 * to interact with the application layer use cases.
 */

@Injectable({
  providedIn: 'root',
})
export class BookingFacade {
  private readonly createBookingUseCase = inject(CreateBookingUseCase);
  private readonly confirmBookingUseCase = inject(ConfirmBookingUseCase);
  private readonly getUserBookingsUseCase = inject(GetUserBookingsUseCase);

  async createBooking(
    command: CreateBookingCommand,
  ): Promise<CreateBookingResult> {
    return this.createBookingUseCase.execute(command);
  }

  async confirmBooking(bookingId: string): Promise<boolean> {
    return this.confirmBookingUseCase.execute({ bookingId });
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return this.getUserBookingsUseCase.execute({ userId });
  }

  async cancelBooking(bookingId: string): Promise<void> {
    // This would implement cancel logic - simplified for example
    throw new Error('Cancel booking not implemented yet, ' + bookingId);
  }

  async completeBooking(bookingId: string): Promise<void> {
    // This would implement complete logic - simplified for example
    throw new Error('Complete booking not implemented yet, ' + bookingId);
  }
}
