import { Booking } from '../domain';
import {
  ConfirmBookingUseCase,
  CreateBookingUseCase,
  GetUserBookingsUseCase,
} from './booking.use-cases';

/**
 * Application Service - Booking Service
 *
 * Provides higher-level operations and coordinates
 * between multiple use cases and domain services.
 */

export interface BookingAnalytics {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  mostPopularService: string;
}

export class BookingApplicationService {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly confirmBookingUseCase: ConfirmBookingUseCase,
    private readonly getUserBookingsUseCase: GetUserBookingsUseCase,
  ) {}

  async getBookingAnalytics(userId: string): Promise<BookingAnalytics> {
    const userBookings = await this.getUserBookingsUseCase.execute({ userId });

    const completedBookings = userBookings.filter(
      (booking: Booking) => booking.status === 'completed',
    );

    const totalRevenue = completedBookings.reduce(
      (sum: number, booking: Booking) => sum + booking.totalAmount,
      0,
    );

    const serviceCount = completedBookings.reduce(
      (acc: Record<string, number>, booking: Booking) => {
        acc[booking.serviceType] = (acc[booking.serviceType] || 0) + 1;
        return acc;
      },
      {},
    );

    const mostPopularService =
      Object.entries(serviceCount).sort(
        ([, a], [, b]) => (b as number) - (a as number),
      )[0]?.[0] || 'N/A';

    return {
      totalBookings: userBookings.length,
      totalRevenue,
      averageBookingValue:
        completedBookings.length > 0
          ? totalRevenue / completedBookings.length
          : 0,
      mostPopularService,
    };
  }

  async processBookingWorkflow(
    userId: string,
    serviceType: string,
    startDate: Date,
    endDate: Date,
    pricePerHour: number,
    autoConfirm = false,
  ): Promise<string> {
    // Create booking
    const createResult = await this.createBookingUseCase.execute({
      userId,
      serviceType,
      startDate,
      endDate,
      pricePerHour,
    });

    if (!createResult.success) {
      throw new Error(createResult.message);
    }

    // Auto-confirm if requested
    if (autoConfirm) {
      await this.confirmBookingUseCase.execute({
        bookingId: createResult.bookingId,
      });
    }

    return createResult.bookingId;
  }
}
