export function formatCurrency(amount: number) {
    return new Intl.NumberFormat(
        'en-NG',
        {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 2,
        }
    ).format(amount);
}