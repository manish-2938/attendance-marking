import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'],
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
})
export class QrCodeComponent implements OnInit {
  @Input() eventId: string ='';
  @Input() eventName: string = '';
  @Input() studentId: string = '';
  @Input() rollNumber: string = '';
  @Input() branch: string = '';
 
  qrData: string = '';

  ngOnInit(): void {
    // Generate QR data as JSON string
    this.qrData = JSON.stringify({
      eventName:this.eventName,
      eventId: this.eventId,
      studentId: '679e0a73de5a299fd35017c1',
      // rollNumber: this.rollNumber,
      // branch: this.branch,
      rollNumber: '160121735104',
      branch: 'ECE',
    });
  }
}
