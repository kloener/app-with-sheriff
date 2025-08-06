import { Booking, BookingId, UserId } from '../domain';
import { BookingRepository, BookingDomainService } from '../domain';

/**
 * Application Use Case - Create Booking
 *
 * Orchestrates the creation of a new booking,
 * coordinating between domain logic and infrastructure.
 */

export interface CreateBookingCommand {
  userId: string;
  serviceType: string;
  startDate: Date;
  endDate: Date;
  pricePerHour: number;
}

export interface CreateBookingResult {
  bookingId: string;
  success: boolean;
  message: string;
}

export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository
  ) {}

  async execute(command: CreateBookingCommand): Promise<CreateBookingResult> {
    try {
      // Validate business rules
      const existingBookings = await this.bookingRepository.findByDateRange(
        command.startDate,
        command.endDate
      );

      // Create new booking entity
      const bookingId: BookingId = { value: this.generateId() };
      const userId: UserId = { value: command.userId };

      const newBooking = new Booking(
        bookingId,
        userId,
        command.serviceType,
        command.startDate,
        command.endDate
      );

      // Check for conflicts using domain service
      if (BookingDomainService.checkForConflicts(newBooking, existingBookings)) {
        return {
          bookingId: '',
          success: false,
          message: 'Booking conflicts with existing reservation'
        };
      }

      // Calculate amount
      newBooking.calculateAmount(command.pricePerHour);

      // Save booking
      await this.bookingRepository.save(newBooking);

      return {
        bookingId: bookingId.value,
        success: true,
        message: 'Booking created successfully'
      };

    } catch (error) {
      return {
        bookingId: '',
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private generateId(): string {
    return `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Application Use Case - Confirm Booking
 */

export interface ConfirmBookingCommand {
  bookingId: string;
}

export class ConfirmBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository
  ) {}

  async execute(command: ConfirmBookingCommand): Promise<boolean> {
    const bookingId: BookingId = { value: command.bookingId };
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.confirm();
    await this.bookingRepository.save(booking);

    return true;
  }
}

/**
 * Application Use Case - Get User Bookings
 */

export interface GetUserBookingsQuery {
  userId: string;
}

export class GetUserBookingsUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository
  ) {}

  async execute(query: GetUserBookingsQuery): Promise<Booking[]> {
    const userId: UserId = { value: query.userId };
    return this.bookingRepository.findByUserId(userId);
  }
}
