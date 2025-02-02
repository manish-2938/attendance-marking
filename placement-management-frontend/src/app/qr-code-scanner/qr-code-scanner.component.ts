import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css'],
  standalone: true,
  imports: [ZXingScannerModule, CommonModule], // Import ZXingScannerModule for QR scanning
})
export class QrCodeScannerComponent {
  scannedResult: any = null; // Store the scanned QR code data
  formats = [BarcodeFormat.QR_CODE];
  constructor(private http: HttpClient) {}

  onScanSuccess(result: string): void {
    try {
      this.scannedResult = JSON.parse(result); // Convert QR code string to JSON
      
      // Check if required data exists
      if (!this.scannedResult.eventId || !this.scannedResult.studentId) {
        alert('Invalid QR Code');
        return;
      }

      // Send attendance data to backend
      this.markAttendance(this.scannedResult.eventId, this.scannedResult.studentId);
    } catch (error) {
      alert('Invalid QR Code format');
    }
  }

  markAttendance(eventId: string, studentId: string): void {
    console.log('Sending data:', { eventId, studentId });
    this.http.post('http://localhost:5000/api/attendance/mark', { eventId, studentId })
      .subscribe({
        next: (response) => {
          alert('Attendance marked successfully!');
        },
        error: (error) => {
          alert('Error marking attendance: ' + error.message);
        }
      });
  }
}

