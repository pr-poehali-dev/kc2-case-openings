
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Item } from "@/types";

interface OpenCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseName: string;
  caseImage: string;
  rarity: string;
}

// Заглушка для предметов, которые могут выпасть из кейса
const generatePossibleItems = (rarity: string): Item[] => {
  const rarities = ["common", "rare", "epic", "legendary"];
  const rarityIndex = rarities.indexOf(rarity);
  
  // Генерируем набор из 20 предметов разной редкости
  return Array.from({ length: 20 }, (_, i) => {
    // Вычисляем шанс более редкого предмета на основе редкости кейса
    const itemRarityIndex = Math.random() * 100 < 60 
      ? rarityIndex 
      : Math.min(Math.floor(Math.random() * 4), 3);
    
    const itemRarity = rarities[itemRarityIndex];
    
    // Определяем цену предмета на основе редкости
    const basePrices = { common: 100, rare: 300, epic: 700, legendary: 1500 };
    const basePrice = basePrices[itemRarity as keyof typeof basePrices];
    const price = basePrice + Math.floor(Math.random() * basePrice * 0.5);
    
    const weaponTypes = ["AK-47", "M4A4", "AWP", "Desert Eagle", "Glock", "USP", "MP5", "P90", "Knife"];
    const skinAdjectives = ["Неоновый", "Кровавый", "Ледяной", "Огненный", "Призрачный", "Штормовой", "Элитный"];
    const skinNouns = ["Рассвет", "Хищник", "Зверь", "Дракон", "Тигр", "Ассасин", "Страж"];
    
    const weapon = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
    const adjective = skinAdjectives[Math.floor(Math.random() * skinAdjectives.length)];
    const noun = skinNouns[Math.floor(Math.random() * skinNouns.length)];
    
    // Генерируем URL для иллюстрации
    const imageIds = [
      "photo-1605792657660-596af9009e82",
      "photo-1608270586620-248524c67de9",
      "photo-1587655957037-78defa2fb96c",
      "photo-1613591741539-fabb34e6b283",
      "photo-1621975883759-1e027ca54ae3",
      "photo-1518709268805-4e9042af9f23",
      "photo-1548269957-ae9d3aebc407",
      "photo-1547700055-b61cacebece9",
      "photo-1555661530-68c8e98dbce3",
      "photo-1624454002302-89e325a0cf8a"
    ];
    
    const imageId = imageIds[Math.floor(Math.random() * imageIds.length)];
    const imageUrl = `https://images.unsplash.com/${imageId}?q=80&w=800&auto=format&fit=crop`;
    
    return {
      id: `item-${i}-${Date.now()}`,
      name: `${adjective} ${noun} | ${weapon}`,
      price,
      image: imageUrl,
      rarity: itemRarity,
    };
  });
};

// Функция для получения цвета рамки в зависимости от редкости
const getRarityBorderColor = (rarity: string): string => {
  switch (rarity) {
    case "common":
      return "border-blue-500";
    case "rare":
      return "border-purple-500";
    case "epic":
      return "border-pink-500";
    case "legendary":
      return "border-yellow-400";
    default:
      return "border-gray-400";
  }
};

// Функция для получения фонового цвета в зависимости от редкости
const getRarityBgColor = (rarity: string): string => {
  switch (rarity) {
    case "common":
      return "from-blue-500/20 to-blue-600/5";
    case "rare":
      return "from-purple-500/20 to-purple-600/5";
    case "epic":
      return "from-pink-500/20 to-pink-600/5";
    case "legendary":
      return "from-yellow-400/30 to-yellow-500/10";
    default:
      return "from-gray-500/20 to-gray-600/5";
  }
};

const OpenCaseModal = ({ isOpen, onClose, caseName, caseImage, rarity }: OpenCaseModalProps) => {
  const [step, setStep] = useState<"ready" | "spinning" | "result">("ready");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [winningItem, setWinningItem] = useState<Item | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  
  // Генерируем предметы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setStep("ready");
      setSelectedItemIndex(null);
      setWinningItem(null);
      const possibleItems = generatePossibleItems(rarity);
      setItems(possibleItems);
    }
  }, [isOpen, rarity]);
  
  // Начать прокрутку
  const startSpin = () => {
    if (step !== "ready" || !spinnerRef.current) return;
    
    setStep("spinning");
    
    // Создаем дублированный массив айтемов для эффекта бесконечной прокрутки
    const extendedItems = [...items, ...items, ...items];
    
    // Выбираем случайный индекс для выигрышного айтема из второго набора
    // (первый набор прокручивается полностью, остановка во втором наборе)
    const randomIndex = Math.floor(Math.random() * items.length) + items.length;
    setSelectedItemIndex(randomIndex);
    const winItem = extendedItems[randomIndex];
    setWinningItem(winItem);
    
    // Вычисляем позицию для скролла (скролл до выбранного элемента)
    const itemWidth = 180; // ширина элемента + отступы
    const spinnerElement = spinnerRef.current;
    
    // Сначала быстрая прокрутка
    spinnerElement.style.transition = "transform 0.5s ease-in";
    spinnerElement.style.transform = "translateX(-500px)";
    
    // Затем прокрутка с замедлением до выбранного элемента
    setTimeout(() => {
      const scrollToPosition = randomIndex * itemWidth - (window.innerWidth / 2) + (itemWidth / 2);
      
      spinnerElement.style.transition = "transform 5s cubic-bezier(0.2, 0.7, 0.3, 1)";
      spinnerElement.style.transform = `translateX(-${scrollToPosition}px)`;
      
      // По окончании прокрутки показываем результат
      setTimeout(() => {
        setStep("result");
      }, 5500);
    }, 500);
  };
  
  // Закрыть модальное окно с сбросом состояния
  const handleClose = () => {
    setStep("ready");
    setSelectedItemIndex(null);
    setWinningItem(null);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-[#1A1F2C] p-0 text-white border-0 rounded-xl overflow-hidden">
        {step === "ready" && (
          <div className="flex flex-col items-center py-12 px-4">
            <h2 className="text-3xl font-bold mb-6">{caseName}</h2>
            <div className="mb-6 relative">
              <img 
                src={caseImage} 
                alt={caseName} 
                className={`h-64 w-64 object-cover rounded-lg ${getRarityBorderColor(rarity)} border-2`} 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-xl font-bold bg-black/60 p-4 rounded">Открыть кейс</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-center">
              Испытайте свою удачу с кейсом {caseName}. <br />
              Возможность получить редкие скины и уникальное оружие!
            </p>
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 transition-all px-8 py-6 text-lg"
              onClick={startSpin}
            >
              Открыть за 
              <Icon name="Coins" className="mx-2 h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400">{rarity === "legendary" ? "1599" : rarity === "epic" ? "999" : rarity === "rare" ? "499" : "199"} ₽</span>
            </Button>
          </div>
        )}
        
        {step === "spinning" && (
          <div className="py-8 px-2 overflow-hidden select-none">
            <h2 className="text-2xl font-bold mb-4 text-center">{caseName}</h2>
            <div className="relative h-[280px] overflow-hidden">
              {/* Индикатор в центре */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400 z-20 transform -translate-x-1/2"></div>
              <div className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_5px] shadow-yellow-400/50 z-20 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Градиентные затемнения по бокам */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1A1F2C] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1A1F2C] to-transparent z-10"></div>
              
              {/* Контейнер для прокрутки предметов */}
              <div 
                ref={spinnerRef}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 flex space-x-4 pl-[calc(50%-90px)]"
                style={{willChange: "transform"}}
              >
                {/* Дублируем айтемы для создания бесконечной карусели */}
                {[...items, ...items, ...items].map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className={`flex-shrink-0 w-40 h-60 border-2 ${getRarityBorderColor(item.rarity)} bg-gradient-to-b ${getRarityBgColor(item.rarity)} rounded-lg p-3 flex flex-col`}
                  >
                    <div className="h-32 mb-2 overflow-hidden rounded">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="text-sm font-medium line-clamp-2 mb-auto">{item.name}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs opacity-70">
                        {item.rarity === "legendary" ? "Легендарный" :
                         item.rarity === "epic" ? "Эпический" :
                         item.rarity === "rare" ? "Редкий" : "Обычный"}
                      </div>
                      <div className="text-yellow-400 font-bold">{item.price} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {step === "result" && winningItem && (
          <div className="flex flex-col items-center py-12 px-4">
            <h2 className="text-3xl font-bold mb-2">Поздравляем!</h2>
            <p className="text-gray-300 mb-6">Вы получили:</p>
            
            <div className={`mb-6 border-4 ${getRarityBorderColor(winningItem.rarity)} rounded-lg p-4 w-72 bg-gradient-to-b ${getRarityBgColor(winningItem.rarity)}`}>
              <div className="relative mb-4">
                <img 
                  src={winningItem.image} 
                  alt={winningItem.name} 
                  className="h-48 w-full object-cover rounded" 
                />
                
                {/* Эффект сияния для легендарных и эпических предметов */}
                {(winningItem.rarity === "legendary" || winningItem.rarity === "epic") && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/10 animate-pulse"></div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{winningItem.name}</h3>
              
              <div className="flex justify-between items-center">
                <div className="px-2 py-1 rounded text-xs font-medium" style={{
                  backgroundColor: 
                    winningItem.rarity === "legendary" ? "rgba(234, 179, 8, 0.2)" :
                    winningItem.rarity === "epic" ? "rgba(236, 72, 153, 0.2)" :
                    winningItem.rarity === "rare" ? "rgba(168, 85, 247, 0.2)" : 
                    "rgba(59, 130, 246, 0.2)"
                }}>
                  {winningItem.rarity === "legendary" ? "Легендарный" :
                   winningItem.rarity === "epic" ? "Эпический" :
                   winningItem.rarity === "rare" ? "Редкий" : "Обычный"}
                </div>
                <div className="text-yellow-400 font-bold">{winningItem.price} ₽</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-600 text-purple-400 hover:bg-purple-600/20"
                onClick={handleClose}
              >
                Забрать
              </Button>
              
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  setStep("ready");
                  // Генерируем новые предметы для следующего открытия
                  const possibleItems = generatePossibleItems(rarity);
                  setItems(possibleItems);
                }}
              >
                Открыть ещё раз
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OpenCaseModal;
</script>
