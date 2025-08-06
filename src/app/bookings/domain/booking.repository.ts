import { Booking, BookingId, UserId, BookingStatus } from './booking.entity';

/**
 * Domain Repository Interface - Booking Repository
 *
 * Defines the contract for data persistence without
 * specifying the implementation details.
 */

export interface BookingRepository {
  findById(id: BookingId): Promise<Booking | null>;
  findByUserId(userId: UserId): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
  delete(id: BookingId): Promise<void>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Booking[]>;
}

/**
 * Domain Service - Booking Domain Service
 *
 * Contains domain logic that doesn't belong to a single entity
 * but operates on multiple domain objects.
 */

export class BookingDomainService {

  static checkForConflicts(newBooking: Booking, existingBookings: Booking[]): boolean {
    return existingBookings.some(existing =>
      this.hasDateOverlap(newBooking, existing) &&
      existing.serviceType === newBooking.serviceType
    );
  }

  static calculateTotalRevenue(bookings: Booking[]): number {
    return bookings
      .filter(booking => booking.status === BookingStatus.COMPLETED)
      .reduce((total, booking) => total + booking.totalAmount, 0);
  }

  static findAvailableSlots(
    requestedDate: Date,
    duration: number,
    existingBookings: Booking[]
  ): Date[] {
    const availableSlots: Date[] = [];
    const dayStart = new Date(requestedDate);
    dayStart.setHours(9, 0, 0, 0); // Business hours start at 9 AM

    const dayEnd = new Date(requestedDate);
    dayEnd.setHours(17, 0, 0, 0); // Business hours end at 5 PM

    let currentSlot = new Date(dayStart);

    while (currentSlot.getTime() + duration <= dayEnd.getTime()) {
      const slotEnd = new Date(currentSlot.getTime() + duration);

      const hasConflict = existingBookings.some(booking =>
        this.timeRangesOverlap(
          currentSlot, slotEnd,
          booking.startDate, booking.endDate
        )
      );

      if (!hasConflict) {
        availableSlots.push(new Date(currentSlot));
      }

      currentSlot = new Date(currentSlot.getTime() + (30 * 60 * 1000)); // 30-minute intervals
    }

    return availableSlots;
  }

  private static hasDateOverlap(booking1: Booking, booking2: Booking): boolean {
    return this.timeRangesOverlap(
      booking1.startDate, booking1.endDate,
      booking2.startDate, booking2.endDate
    );
  }

  private static timeRangesOverlap(
    start1: Date, end1: Date,
    start2: Date, end2: Date
  ): boolean {
    return start1 < end2 && start2 < end1;
  }
}
