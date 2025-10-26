import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const buttons = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "÷", type: "operation" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "×", type: "operation" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operation" },
    { label: "0", type: "number" },
    { label: ".", type: "decimal" },
    { label: "=", type: "equals" },
    { label: "+", type: "operation" },
  ];

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-secondary rounded-lg p-4 text-right">
          <div className="text-sm text-muted-foreground h-6">
            {previousValue !== null && `${previousValue} ${operation || ""}`}
          </div>
          <div className="text-3xl font-bold text-foreground break-all">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="destructive"
            className="col-span-4"
            onClick={handleClear}
          >
            Clear
          </Button>
          
          {buttons.map((btn) => (
            <Button
              key={btn.label}
              variant={btn.type === "operation" || btn.type === "equals" ? "default" : "secondary"}
              className={btn.type === "equals" ? "bg-gradient-primary" : ""}
              onClick={() => {
                if (btn.type === "number") handleNumber(btn.label);
                else if (btn.type === "operation") handleOperation(btn.label);
                else if (btn.type === "decimal") handleDecimal();
                else if (btn.type === "equals") handleEquals();
              }}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
