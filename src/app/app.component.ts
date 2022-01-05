import { Component } from '@angular/core';
import { finalize, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  log = 'LOG:';
  inputId: string | undefined;
  private nextId = 1;
  private subscriptions: { id: number; subscription: Subscription }[] = [];

  start(): void {
    const subject = new Subject<number>();
    let inter: number | undefined;
    ((id) => {
      inter = window.setInterval(() => {
        this.logMessage(`setInterval: ${id}`);
        subject.next(id);
      }, 1000);
    })(this.nextId);

    this.subscriptions.push({
      id: this.nextId++,
      subscription: subject
        .pipe(finalize(() => window.clearInterval(inter)))
        .subscribe((id) => this.logMessage(`subscribe: ${id}`)),
    });
  }

  stop(): void {
    if (!this.inputId) {
      this.showError('invalid id.');
      return;
    }

    const id = parseInt(this.inputId);
    if (!id) {
      this.showError('invalid id.');
      return;
    }

    const sub = this.subscriptions.find((s) => s.id === id);

    if (!sub) {
      this.showError('id not found.');
      return;
    }

    sub.subscription.unsubscribe();
  }

  private showError(msg: string): void {
    window.alert(msg);
  }

  private logMessage(msg: string): void {
    this.log += `\n${msg}`;
  }
}
