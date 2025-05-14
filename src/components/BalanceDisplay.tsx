
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { toast } from "@/components/ui/use-toast";

interface BalanceDisplayProps {
  balance: number;
  onAddBalance: (amount: number) => void;
}

const BalanceDisplay = ({ balance, onAddBalance }: BalanceDisplayProps) => {
  const [amount, setAmount] = useState<string>("");

  const handleAddBalance = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Некорректная сумма",
        description: "Пожалуйста, введите положительное число",
        variant: "destructive",
      });
      return;
    }

    onAddBalance(numAmount);
    setAmount("");
    toast({
      title: "Баланс пополнен",
      description: `На ваш счет добавлено ${numAmount} ₽`,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 rounded-lg bg-purple-500/20 px-3 py-1.5 hover:bg-purple-500/30">
          <Icon name="Coins" className="h-5 w-5 text-yellow-400" />
          <span className="font-bold">{balance.toFixed(0)} ₽</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-[#1A1F2C] border border-gray-700 text-white p-4">
        <h3 className="text-lg font-semibold mb-2">Пополнить баланс</h3>
        <p className="text-sm text-gray-300 mb-4">
          Введите сумму для пополнения игрового баланса
        </p>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Введите сумму"
            className="bg-[#0F131C] border-gray-700 text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button 
            onClick={handleAddBalance}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Пополнить
          </Button>
        </div>
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-700 hover:bg-gray-700"
            onClick={() => onAddBalance(500)}
          >
            +500 ₽
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700 hover:bg-gray-700"
            onClick={() => onAddBalance(1000)}
          >
            +1000 ₽
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700 hover:bg-gray-700"
            onClick={() => onAddBalance(2000)}
          >
            +2000 ₽
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BalanceDisplay;
