import TransactionItem from '../TransactionItem';

export default function TransactionItemExample() {
  return (
    <div className="p-8 space-y-3">
      <TransactionItem
        id="tx1"
        type="deposit"
        description="Depósito via PIX"
        amount={50.00}
        status="completed"
        date="14/11/2025 às 10:30"
      />
      <TransactionItem
        id="tx2"
        type="purchase"
        description="Compra de VIP 30 Dias"
        amount={29.90}
        status="completed"
        date="14/11/2025 às 10:35"
      />
      <TransactionItem
        id="tx3"
        type="sale"
        description="Venda de 500 Pontos"
        amount={5.00}
        status="pending"
        date="14/11/2025 às 11:00"
      />
      <TransactionItem
        id="tx4"
        type="deposit"
        description="Depósito via Cartão"
        amount={100.00}
        status="failed"
        date="13/11/2025 às 15:20"
      />
    </div>
  );
}
