import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import BalanceDisplay from "@/components/BalanceDisplay";
import OpenCaseModal from "@/components/OpenCaseModal";
import NotEnoughBalanceModal from "@/components/NotEnoughBalanceModal";
import { Case } from "@/types";

const Index = () => {
  // Состояние для баланса пользователя
  const [balance, setBalance] = useState<number>(1000);

  // Состояние для управления модальными окнами
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showCaseModal, setShowCaseModal] = useState<boolean>(false);
  const [showBalanceModal, setShowBalanceModal] = useState<boolean>(false);

  // Функция для пополнения баланса
  const handleAddBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  // Функция для списания средств
  const handleSpendBalance = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      return true;
    }
    return false;
  };

  // Функция для открытия кейса
  const handleOpenCase = (caseItem: Case) => {
    setSelectedCase(caseItem);

    if (balance >= caseItem.price) {
      setShowCaseModal(true);
      handleSpendBalance(caseItem.price);
    } else {
      setShowBalanceModal(true);
    }
  };

  // Данные о кейсах
  const cases: Case[] = [
    {
      id: 1,
      name: "Стандартный кейс",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2202&auto=format&fit=crop",
      rarity: "common",
    },
    {
      id: 2,
      name: "Кейс с AK-47",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=2070&auto=format&fit=crop",
      rarity: "rare",
    },
    {
      id: 3,
      name: "Премиум кейс",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1587655957037-78defa2fb96c?q=80&w=2070&auto=format&fit=crop",
      rarity: "epic",
    },
    {
      id: 4,
      name: "Элитный снайпер",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1613591741539-fabb34e6b283?q=80&w=1974&auto=format&fit=crop",
      rarity: "rare",
    },
    {
      id: 5,
      name: "Легендарный дроп",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1621975883759-1e027ca54ae3?q=80&w=2070&auto=format&fit=crop",
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Ножевой кейс",
      price: 1599,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1884&auto=format&fit=crop",
      rarity: "legendary",
    },
    {
      id: 7,
      name: "Тактический набор",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1548269957-ae9d3aebc407?q=80&w=2028&auto=format&fit=crop",
      rarity: "epic",
    },
    {
      id: 8,
      name: "Военный кейс",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1547700055-b61cacebece9?q=80&w=2070&auto=format&fit=crop",
      rarity: "rare",
    },
    {
      id: 9,
      name: "Штурмовой кейс",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1555661530-68c8e98dbce3?q=80&w=2073&auto=format&fit=crop",
      rarity: "common",
    },
    {
      id: 10,
      name: "Золотая коллекция",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1624454002302-89e325a0cf8a?q=80&w=1974&auto=format&fit=crop",
      rarity: "epic",
    },
  ];

  // Получить цвет для редкости
  const getRarityColor = (rarity: Case["rarity"]) => {
    switch (rarity) {
      case "common":
        return "border-blue-500 bg-blue-500/10";
      case "rare":
        return "border-purple-500 bg-purple-500/10";
      case "epic":
        return "border-pink-500 bg-pink-500/10";
      case "legendary":
        return "border-yellow-400 bg-yellow-400/10";
      default:
        return "border-gray-400 bg-gray-400/10";
    }
  };

  // Получить название редкости
  const getRarityName = (rarity: Case["rarity"]) => {
    switch (rarity) {
      case "common":
        return "Обычный";
      case "rare":
        return "Редкий";
      case "epic":
        return "Эпический";
      case "legendary":
        return "Легендарный";
      default:
        return "Неизвестный";
    }
  };

  return (
    <div className="min-h-screen bg-[#161A27] text-white">
      {/* Шапка сайта */}
      <header className="border-b border-gray-800 bg-[#0F131C]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-purple-400">KC2DROP</div>
              <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs">
                BETA
              </span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li className="font-medium">Главная</li>
                <li className="font-medium text-gray-400 transition-colors hover:text-white">
                  Все кейсы
                </li>
                <li className="font-medium text-gray-400 transition-colors hover:text-white">
                  Топ дропы
                </li>
                <li className="font-medium text-gray-400 transition-colors hover:text-white">
                  FAQ
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <BalanceDisplay
                balance={balance}
                onAddBalance={handleAddBalance}
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Icon name="LogIn" className="mr-2 h-4 w-4" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Открывай кейсы KC2</h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Испытай удачу и получи редкие скины из игры KC2. Выбирай из
            множества кейсов с разными шансами на выигрыш легендарных предметов!
          </p>
        </div>

        {/* Сетка кейсов */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="group">
              <Card
                className={`border-2 ${getRarityColor(
                  caseItem.rarity,
                )} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_0] hover:shadow-purple-500/50`}
              >
                <CardContent className="overflow-hidden p-3">
                  <div className="relative mb-3 overflow-hidden rounded-md">
                    <div
                      className="h-44 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${caseItem.image})` }}
                    ></div>
                    <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-semibold">
                      {getRarityName(caseItem.rarity)}
                    </div>
                  </div>
                  <div className="mb-2 text-lg font-bold">{caseItem.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-yellow-400">
                      {caseItem.price} ₽
                    </div>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleOpenCase(caseItem)}
                    >
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      {/* Модальные окна */}
      {selectedCase && (
        <>
          <OpenCaseModal
            isOpen={showCaseModal}
            onClose={() => setShowCaseModal(false)}
            caseName={selectedCase.name}
            caseImage={selectedCase.image}
            rarity={selectedCase.rarity}
          />

          <NotEnoughBalanceModal
            isOpen={showBalanceModal}
            onClose={() => setShowBalanceModal(false)}
            requiredAmount={selectedCase.price}
            currentBalance={balance}
            onAddBalance={handleAddBalance}
          />
        </>
      )}

      {/* Футер */}
      <footer className="border-t border-gray-800 bg-[#0F131C] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <div className="mb-1 text-xl font-bold text-purple-400">
                KC2DROP
              </div>
              <p className="text-sm text-gray-400">
                © 2025 KC2DROP. Все права защищены.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <div className="text-sm text-gray-400">
                Мы в социальных сетях:
              </div>
              <div className="flex gap-3">
                <Icon
                  name="Instagram"
                  className="h-5 w-5 text-gray-400 hover:text-white"
                />
                <Icon
                  name="Twitter"
                  className="h-5 w-5 text-gray-400 hover:text-white"
                />
                <Icon
                  name="Youtube"
                  className="h-5 w-5 text-gray-400 hover:text-white"
                />
                <Icon
                  name="Twitch"
                  className="h-5 w-5 text-gray-400 hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
