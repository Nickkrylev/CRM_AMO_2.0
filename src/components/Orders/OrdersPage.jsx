import React, { useState, useRef, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "../Sidebar";
import StageColumn from "./StageColumn";
import OrderModal from "../modals/OrderModal/OrderModal";
import useHorizontalDragScroll from "./hooks/useHorizontalDragScroll";
import "../../styles/OrdersPage.css";

const stages = [
  "Лиды", "Изучаем ТЗ", "Обсуждаем с клиентом", "Клиент думает",
  "Ожидаем предоплату", "Взяли в работу", "Ведется разработка",
  "На уточнении у клиента", "Тестируем", "Тестирует клиент",
  "На доработке", "Ожидаем оплату", "Успешно завершен", "Закрыт"
];

const OrdersPage = () => {
    const [orders, setOrders] = useState([
        { id: 1, name: "Разработка СРМ", stage: "Лиды", date: "22.03.25", price: 50000, client: "Лев" },
        { id: 2, name: "Редизайн сайта", stage: "Лиды", date: "23.03.25", price: 24300 },
        { id: 3, name: "Предрейс", stage: "Лиды", date: "27.03.25" },
        { id: 4, name: "Покурить", stage: "Лиды" },
        { id: 5, name: "Предрейс", stage: "Лиды" },
        { id: 6, name: "Покурить", stage: "Лиды" },
        { id: 7, name: "Выпить пива", stage: "Лиды" },
        { id: 8, name: "Тим билдинг в кс2", stage: "Лиды" },
        { id: 9, name: "Покурить", stage: "Лиды" },
        { id: 10, name: "Тим билдинг в кс2", stage: "Лиды" },
        { id: 11, name: "Покурить", stage: "Лиды" }
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const stagesContainerRef = useRef(null);
    const isDraggingRef = useRef(false);

    const moveOrder = useCallback((orderId, newStage, newIndex) => {
            setOrders((prevOrders) => {

                const order = prevOrders.find((o) => o.id === orderId);
                if (!order) return prevOrders;

                const filteredOrders = prevOrders.filter((o) => o.id !== orderId);
                const newOrders = [...filteredOrders];

                newOrders.splice(newIndex, 0, { ...order, stage: newStage });

                return newOrders;
            });
    }, []);

    const updateOrder = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order))
    );
  };

    useHorizontalDragScroll(stagesContainerRef, isDraggingRef);

    return (
        <div className="orders-page">
            <Sidebar />
            <div className="order-page-main-container">
                <header className="order-header-container">
                    <button type="button" className="create-order-btn">Создать заказ</button>
                </header>
                <DndProvider backend={HTML5Backend}>
                <div className="stages-container" ref={stagesContainerRef}>
                    {stages.map((stage) => (
                    <StageColumn
                        key={stage}
                        stage={stage}
                        orders={orders.filter((order) => order.stage === stage)}
                        moveOrder={moveOrder}
                        onOrderClick={setSelectedOrder}
                        isDraggingRef={isDraggingRef}
                    />
                    ))}
                </div>
                </DndProvider>
            </div>
            {selectedOrder && (
                <OrderModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onUpdateOrder={updateOrder}
                />
            )}
        </div>
    );
};

export default OrdersPage;