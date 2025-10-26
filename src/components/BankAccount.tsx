import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: Date;
  balance: number;
}

const BankAccount = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    
    if (!amount || isNaN(depositAmount) || depositAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const newBalance = balance + depositAmount;
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: "deposit",
      amount: depositAmount,
      date: new Date(),
      balance: newBalance,
    };

    setBalance(newBalance);
    setTransactions([transaction, ...transactions]);
    setAmount("");
    toast.success(`Deposited $${depositAmount.toFixed(2)}`);
  };

  const handleWithdrawal = () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    const newBalance = balance - withdrawAmount;
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: "withdrawal",
      amount: withdrawAmount,
      date: new Date(),
      balance: newBalance,
    };

    setBalance(newBalance);
    setTransactions([transaction, ...transactions]);
    setAmount("");
    toast.success(`Withdrew $${withdrawAmount.toFixed(2)}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          Bank Account Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-primary text-primary-foreground rounded-xl p-6">
          <p className="text-sm opacity-90 mb-1">Current Balance</p>
          <p className="text-4xl font-bold">
            ${balance.toFixed(2)}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleDeposit}
              className="bg-gradient-success"
            >
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Deposit
            </Button>
            <Button
              onClick={handleWithdrawal}
              variant="destructive"
            >
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Transaction History</h3>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transactions yet
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {transaction.type === "deposit" ? (
                      <ArrowDownCircle className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowUpCircle className="h-5 w-5 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === "deposit" ? "text-success" : "text-destructive"
                    }`}>
                      {transaction.type === "deposit" ? "+" : "-"}
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Balance: ${transaction.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BankAccount;
