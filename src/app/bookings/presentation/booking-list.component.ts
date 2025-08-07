import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Booking } from '../domain';
import { BookingFacade } from './booking.facade';

/**
 * Presentation Component - Booking List Component
 *
 * Displays a list of bookings and allows basic operations.
 * Follows Angular best practices and Clean Architecture principles.
 */

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="booking-list">
      <h2>My Bookings</h2>

      <!-- Create Booking Form -->
      <div class="create-booking-form">
        <h3>Create New Booking</h3>
        <form [formGroup]="bookingForm" (ngSubmit)="onCreateBooking()">
          <div class="form-group">
            <label for="serviceType">Service Type:</label>
            <select id="serviceType" formControlName="serviceType">
              <option value="">Select a service</option>
              <option value="consultation">Consultation</option>
              <option value="meeting">Meeting</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          <div class="form-group">
            <label for="startDate">Start Date:</label>
            <input
              type="datetime-local"
              id="startDate"
              formControlName="startDate"
            />
          </div>

          <div class="form-group">
            <label for="endDate">End Date:</label>
            <input
              type="datetime-local"
              id="endDate"
              formControlName="endDate"
            />
          </div>

          <div class="form-group">
            <label for="pricePerHour">Price per Hour:</label>
            <input
              type="number"
              id="pricePerHour"
              formControlName="pricePerHour"
              min="0"
              step="0.01"
            />
          </div>

          <pre>{{ bookingForm.value | json }}</pre>

          <button type="submit" [disabled]="bookingForm.invalid || isLoading">
            {{ isLoading() ? 'Creating...' : 'Create Booking' }}
          </button>
        </form>
      </div>

      <!-- Bookings Display -->
      <div class="bookings-container">
        <div *ngIf="isLoading() && bookings.length === 0" class="loading">
          Loading bookings...
        </div>

        <div *ngIf="!isLoading && bookings.length === 0" class="no-bookings">
          No bookings found. Create your first booking above!
        </div>

        <div
          *ngFor="let booking of bookings(); trackBy: trackByBookingId"
          class="booking-card"
          [class.confirmed]="booking.status === 'confirmed'"
          [class.pending]="booking.status === 'pending'"
          [class.cancelled]="booking.status === 'cancelled'"
        >
          <div class="booking-header">
            <h4>{{ booking.serviceType | titlecase }}</h4>
            <span class="status-badge" [class]="booking.status">
              {{ booking.status | titlecase }}
            </span>
          </div>

          <div class="booking-details">
            <p>
              <strong>Start:</strong> {{ booking.startDate | date: 'medium' }}
            </p>
            <p><strong>End:</strong> {{ booking.endDate | date: 'medium' }}</p>
            <p><strong>Duration:</strong> {{ calculateDuration(booking) }}</p>
            <p><strong>Amount:</strong> {{ booking.totalAmount | currency }}</p>
          </div>

          <div class="booking-actions">
            <button
              *ngIf="booking.status === 'pending'"
              (click)="onConfirmBooking(booking.id.value)"
              class="btn-confirm"
            >
              Confirm
            </button>
            <button
              *ngIf="canCancel(booking)"
              (click)="onCancelBooking(booking.id.value)"
              class="btn-cancel"
            >
              Cancel
            </button>
            <button
              *ngIf="canComplete(booking)"
              (click)="onCompleteBooking(booking.id.value)"
              class="btn-complete"
            >
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .booking-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      .create-booking-form {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .form-group input,
      .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .booking-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
        background: white;
      }

      .booking-card.confirmed {
        border-left: 4px solid #28a745;
      }

      .booking-card.pending {
        border-left: 4px solid #ffc107;
      }

      .booking-card.cancelled {
        border-left: 4px solid #dc3545;
      }

      .booking-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }

      .status-badge.confirmed {
        background: #d4edda;
        color: #155724;
      }

      .status-badge.pending {
        background: #fff3cd;
        color: #856404;
      }

      .status-badge.cancelled {
        background: #f8d7da;
        color: #721c24;
      }

      .booking-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
      }

      .booking-actions button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .btn-confirm {
        background: #28a745;
        color: white;
      }

      .btn-cancel {
        background: #dc3545;
        color: white;
      }

      .btn-complete {
        background: #007bff;
        color: white;
      }

      .loading,
      .no-bookings {
        text-align: center;
        padding: 40px;
        color: #666;
      }
    `,
  ],
})
export class BookingListComponent implements OnInit {
  private readonly bookingFacade = inject(BookingFacade);
  private readonly formBuilder = inject(FormBuilder);

  bookings = signal<Booking[]>([]);
  isLoading = signal(false);

  bookingForm: FormGroup = this.formBuilder.group({
    serviceType: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    pricePerHour: [50, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.bookings.set(await this.bookingFacade.getUserBookings('user1'));
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onCreateBooking(): Promise<void> {
    if (this.bookingForm.invalid) return;

    this.isLoading.set(true);
    const formValue = this.bookingForm.value;

    try {
      const result = await this.bookingFacade.createBooking({
        userId: 'current-user-id',
        serviceType: formValue.serviceType,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
        pricePerHour: formValue.pricePerHour,
      });

      if (result.success) {
        this.bookingForm.reset();
        await this.loadBookings();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onConfirmBooking(bookingId: string): Promise<void> {
    try {
      await this.bookingFacade.confirmBooking(bookingId);
      await this.loadBookings();
    } catch (error) {
      console.error('Failed to confirm booking:', error);
      alert('Failed to confirm booking. Please try again.');
    }
  }

  async onCancelBooking(bookingId: string): Promise<void> {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await this.bookingFacade.cancelBooking(bookingId);
      await this.loadBookings();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  }

  async onCompleteBooking(bookingId: string): Promise<void> {
    try {
      await this.bookingFacade.completeBooking(bookingId);
      await this.loadBookings();
    } catch (error) {
      console.error('Failed to complete booking:', error);
      alert('Failed to complete booking. Please try again.');
    }
  }

  trackByBookingId(index: number, booking: Booking): string {
    return booking.id.value;
  }

  calculateDuration(booking: Booking): string {
    const duration = booking.duration;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  canCancel(booking: Booking): boolean {
    return booking.status !== 'completed' && booking.status !== 'cancelled';
  }

  canComplete(booking: Booking): boolean {
    return booking.status === 'confirmed' && new Date() >= booking.endDate;
  }
}
