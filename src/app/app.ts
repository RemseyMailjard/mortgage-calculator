import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly purchasePrice = signal(425000);
  protected readonly downPayment = signal(85000);
  protected readonly annualRate = signal(5.75);
  protected readonly termYears = signal(30);
  protected readonly propertyTaxMonthly = signal(425);
  protected readonly insuranceMonthly = signal(145);

  protected readonly loanAmount = computed(() =>
    Math.max(this.purchasePrice() - this.downPayment(), 0),
  );

  protected readonly downPaymentPercent = computed(() => {
    const price = this.purchasePrice();

    return price > 0 ? (this.downPayment() / price) * 100 : 0;
  });

  protected readonly principalAndInterest = computed(() => {
    const principal = this.loanAmount();
    const monthlyRate = this.annualRate() / 100 / 12;
    const paymentCount = this.termYears() * 12;

    if (principal <= 0 || paymentCount <= 0) {
      return 0;
    }

    if (monthlyRate === 0) {
      return principal / paymentCount;
    }

    return (
      (principal * monthlyRate * (1 + monthlyRate) ** paymentCount) /
      ((1 + monthlyRate) ** paymentCount - 1)
    );
  });

  protected readonly estimatedMonthlyPayment = computed(
    () =>
      this.principalAndInterest() +
      this.propertyTaxMonthly() +
      this.insuranceMonthly(),
  );

  protected readonly totalInterest = computed(() => {
    const totalPrincipalAndInterest = this.principalAndInterest() * this.termYears() * 12;

    return Math.max(totalPrincipalAndInterest - this.loanAmount(), 0);
  });

  protected readonly totalCost = computed(
    () => this.estimatedMonthlyPayment() * this.termYears() * 12,
  );

  protected updatePurchasePrice(event: Event): void {
    this.purchasePrice.set(this.valueFromEvent(event));
    this.clampDownPayment();
  }

  protected updateDownPayment(event: Event): void {
    this.downPayment.set(Math.min(this.valueFromEvent(event), this.purchasePrice()));
  }

  protected updateAnnualRate(event: Event): void {
    this.annualRate.set(this.valueFromEvent(event));
  }

  protected updateTermYears(event: Event): void {
    this.termYears.set(this.valueFromEvent(event));
  }

  protected updatePropertyTax(event: Event): void {
    this.propertyTaxMonthly.set(this.valueFromEvent(event));
  }

  protected updateInsurance(event: Event): void {
    this.insuranceMonthly.set(this.valueFromEvent(event));
  }

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  protected formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  private valueFromEvent(event: Event): number {
    const input = event.target as HTMLInputElement;

    return Number(input.value);
  }

  private clampDownPayment(): void {
    if (this.downPayment() > this.purchasePrice()) {
      this.downPayment.set(this.purchasePrice());
    }
  }
}
