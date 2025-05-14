
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NotEnoughBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredAmount: number;
  currentBalance: number;
  onAddBalance: (amount: number) => void;
}

const NotEnoughBalanceModal = ({
  isOpen,
  onClose,
  requiredAmount,
  currentBalance,
  onAddBalance,
}: NotEnoughBalanceModalProps) => {
  const missingAmount = requiredAmount - currentBalance;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] text-white border-gray-700 sm:max-w-md">
        <div className="flex flex-col items-center text-center p-2">
          <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500/20">
            <Icon name="Coins" className="h-8 w-8 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Недостаточно средств</h2>
          
          <p className="text-gray-300 mb-6">
            Не хватает {missingAmount.toFixed(0)} ₽ для открытия этого кейса. 
            Текущий баланс: {currentBalance.toFixed(0)} ₽
          </p>
          
          <div className="flex flex-col w-full gap-3">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                onAddBalance(missingAmount);
                onClose();
              }}
            >
              Пополнить баланс на {missingAmount.toFixed(0)} ₽
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-gray-700 hover:bg-gray-700"
              onClick={onClose}
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotEnoughBalanceModal;
