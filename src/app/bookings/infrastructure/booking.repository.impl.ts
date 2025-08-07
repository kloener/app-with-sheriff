import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Booking, BookingId, UserId, BookingStatus } from '../domain';
import { BookingRepository } from '../domain';

/**
 * API Data Transfer Objects
 */

export interface BookingResponse {
  id: string;
  userId: string;
  serviceType: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: BookingStatus;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingRequest {
  id?: string; // Optional for creation
  userId: string;
  serviceType: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status?: BookingStatus; // Optional for creation (defaults to pending)
  totalAmount?: number; // Optional for creation (calculated)
}

export interface CreateBookingRequest {
  userId: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  pricePerHour: number;
}

export interface UpdateBookingRequest {
  serviceType?: string;
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
}

/**
 * Infrastructure Implementation - In-Memory Booking Repository
 *
 * Concrete implementation of the BookingRepository interface.
 * In a real application, this would connect to a database.
 */

export class InMemoryBookingRepository implements BookingRepository {
  private readonly bookings = new Map<string, Booking>([
    [
      '1',
      new Booking(
        { value: '1' },
        { value: 'user1' },
        'Cleaning',
        new Date('2025-10-01T10:00:00Z'),
        new Date('2025-10-01T11:00:00Z'),
        BookingStatus.CONFIRMED,
        100,
      ),
    ],
  ]);

  async findById(id: BookingId): Promise<Booking | null> {
    const booking = this.bookings.get(id.value);
    return booking || null;
  }

  async findByUserId(userId: UserId): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId.value === userId.value,
    );
  }

  async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id.value, booking);
  }

  async delete(id: BookingId): Promise<void> {
    this.bookings.delete(id.value);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.startDate <= endDate && booking.endDate >= startDate,
    );
  }

  // Additional methods for testing/development
  async findAll(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async clear(): Promise<void> {
    this.bookings.clear();
  }

  get size(): number {
    return this.bookings.size;
  }
}

/**
 * Infrastructure Implementation - HTTP Booking Repository
 *
 * Alternative implementation that would make HTTP calls to an API.
 */

export class HttpBookingRepository implements BookingRepository {
  constructor(
    private readonly apiUrl: string,
    private readonly httpClient: HttpClient,
  ) {}

  async findById(id: BookingId): Promise<Booking | null> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<BookingResponse>(
          `${this.apiUrl}/bookings/${id.value}`,
        ),
      );
      return this.mapToBooking(response);
    } catch (error) {
      if (this.isNotFoundError(error)) {
        return null;
      }
      throw error;
    }
  }

  async findByUserId(userId: UserId): Promise<Booking[]> {
    const response = await firstValueFrom(
      this.httpClient.get<BookingResponse[]>(
        `${this.apiUrl}/users/${userId.value}/bookings`,
      ),
    );
    return response.map((data) => this.mapToBooking(data));
  }

  async save(booking: Booking): Promise<void> {
    const data = this.mapFromBooking(booking);
    await firstValueFrom(this.httpClient.post(`${this.apiUrl}/bookings`, data));
  }

  async delete(id: BookingId): Promise<void> {
    await firstValueFrom(
      this.httpClient.delete(`${this.apiUrl}/bookings/${id.value}`),
    );
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Booking[]> {
    const response = await firstValueFrom(
      this.httpClient.get<BookingResponse[]>(`${this.apiUrl}/bookings`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      }),
    );
    return response.map((data) => this.mapToBooking(data));
  }

  private mapToBooking(data: BookingResponse): Booking {
    // Convert API response to domain entity
    return new Booking(
      { value: data.id },
      { value: data.userId },
      data.serviceType,
      new Date(data.startDate),
      new Date(data.endDate),
      data.status,
      data.totalAmount,
    );
  }

  private mapFromBooking(booking: Booking): BookingRequest {
    // Convert domain entity to API format
    return {
      id: booking.id.value,
      userId: booking.userId.value,
      serviceType: booking.serviceType,
      startDate: booking.startDate.toISOString(),
      endDate: booking.endDate.toISOString(),
      status: booking.status,
      totalAmount: booking.totalAmount,
    };
  }

  private isNotFoundError(error: unknown): boolean {
    return error instanceof HttpErrorResponse ? error?.status === 404 : false;
  }
}
