import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookingListComponent } from '../presentation';

/**
 * Page Component - Bookings Page
 *
 * Top-level page component that orchestrates the booking feature.
 * This is typically what gets mapped to routes.
 */

@Component({
  selector: 'app-bookings-page',
  standalone: true,
  imports: [BookingListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bookings-page">
      <header class="page-header">
        <h1>Booking Management</h1>
        <p>Manage your appointments and reservations</p>
      </header>

      <main class="page-content">
        <app-booking-list></app-booking-list>
      </main>

      <footer class="page-footer">
        <p>Need help? <a href="/support">Contact Support</a></p>
      </footer>
    </div>
  `,
  styles: [
    `
      .bookings-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .page-header {
        background: #f8f9fa;
        padding: 30px 20px;
        text-align: center;
        border-bottom: 1px solid #dee2e6;
      }

      .page-header h1 {
        margin: 0 0 10px 0;
        color: #495057;
      }

      .page-header p {
        margin: 0;
        color: #6c757d;
      }

      .page-content {
        flex: 1;
        padding: 20px;
      }

      .page-footer {
        background: #f8f9fa;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #dee2e6;
      }

      .page-footer a {
        color: #007bff;
        text-decoration: none;
      }

      .page-footer a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class BookingsPageComponent {
  // This component serves as a page container
  // and delegates actual functionality to presentation components
}
