/**
 * Domain Entity - Booking
 *
 * Represents the core business entity for a booking.
 * Contains business logic and domain rules.
 */

export interface BookingId {
  readonly value: string;
}

export interface UserId {
  readonly value: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class Booking {
  constructor(
    private readonly _id: BookingId,
    private readonly _userId: UserId,
    private readonly _serviceType: string,
    private _startDate: Date,
    private _endDate: Date,
    private _status: BookingStatus = BookingStatus.PENDING,
    private _totalAmount = 0,
  ) {
    this.validateDates();
  }

  get id(): BookingId {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
  }

  get serviceType(): string {
    return this._serviceType;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get status(): BookingStatus {
    return this._status;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  get duration(): number {
    return this._endDate.getTime() - this._startDate.getTime();
  }

  // Domain business logic
  confirm(): void {
    if (this._status !== BookingStatus.PENDING) {
      throw new Error('Only pending bookings can be confirmed');
    }
    this._status = BookingStatus.CONFIRMED;
  }

  cancel(): void {
    if (this._status === BookingStatus.COMPLETED) {
      throw new Error('Completed bookings cannot be cancelled');
    }
    this._status = BookingStatus.CANCELLED;
  }

  complete(): void {
    if (this._status !== BookingStatus.CONFIRMED) {
      throw new Error('Only confirmed bookings can be completed');
    }
    if (new Date() < this._endDate) {
      throw new Error('Booking cannot be completed before end date');
    }
    this._status = BookingStatus.COMPLETED;
  }

  updateDates(startDate: Date, endDate: Date): void {
    if (this._status === BookingStatus.COMPLETED) {
      throw new Error('Cannot update dates of completed booking');
    }
    this._startDate = startDate;
    this._endDate = endDate;
    this.validateDates();
  }

  calculateAmount(pricePerHour: number): void {
    const hours = this.duration / (1000 * 60 * 60);
    this._totalAmount = hours * pricePerHour;
  }

  private validateDates(): void {
    if (this._startDate >= this._endDate) {
      throw new Error('Start date must be before end date');
    }
    if (this._startDate < new Date()) {
      throw new Error('Start date cannot be in the past');
    }
  }
}
