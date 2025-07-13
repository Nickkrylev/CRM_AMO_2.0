import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "../components/Sidebar";
import OrderModal from "../components/modals/OrderModal/OrderModal";
import "../styles/OrdersPage.css";

const stages = [
  "Лиды", "Изучаем ТЗ", "Обсуждаем с клиентом", "Клиент думает",
  "Ожидаем предоплату", "Взяли в работу", "Ведется разработка",
  "На уточнении у клиента", "Тестируем", "Тестирует клиент",
  "На доработке", "Ожидаем оплату", "Успешно завершен", "Закрыт"
];

const ItemTypes = { ORDER: "order" };

const Order = ({ order, index, stage, moveOrder, onClick, isDraggingRef }) => {

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
  type: ItemTypes.ORDER,
  item: () => {
    isDraggingRef.current = true;
    return { id: order.id, index, stage };
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
  end: () => {
    isDraggingRef.current = false;
  },
});


  const [, drop] = useDrop({
    accept: ItemTypes.ORDER,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceStage = item.stage;
      const targetStage = stage;

      if (dragIndex === hoverIndex && sourceStage === targetStage) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) return;

      moveOrder(item.id, targetStage, hoverIndex);

      item.index = hoverIndex;
      item.stage = targetStage;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`order-container ${isDragging ? "dragging" : ""}`}
      onClick={() => onClick(order)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="order-left-content">
        <div>Заказ # {order.id}</div>
        <div>{order.name}</div>
      </div>
      <div className="order-right-content">
        <div>{order.date}</div>
      </div>
    </div>
  );
};

const StageColumn = ({ stage, orders, moveOrder, onOrderClick, isDraggingRef }) => {
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ORDER,
    drop: (item) => {
      if (item.stage !== stage) {
        moveOrder(item.id, stage, orders.length);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div ref={ref} className={`stage-column ${isOver ? "highlight" : ""}`}>
      <h3>{stage}</h3>
      <div className="stage-title-line"></div>
      <div className="orders-list hidden-scroll">
        {orders.map((order, index) => (
          <Order
            key={order.id}
            order={order}
            index={index}
            stage={stage}
            moveOrder={moveOrder}
            onClick={onOrderClick}
            isDraggingRef={isDraggingRef}
          />
        ))}
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: "Разработка СРМ", stage: "Лиды", date: "22.03.25" },
    { id: 2, name: "Редизайн сайта", stage: "Лиды", date: "23.03.25" },
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

  useEffect(() => {
    const container = stagesContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      if (e.button !== 0 || isDraggingRef.current || e.target.closest(".order-container")) return;
      console.log("[SCROLL] Mouse down — start drag scroll");
      isDown = true;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const stopScrolling = () => {
      isDown = false;
      container.classList.remove("dragging");
    };

    const onMouseLeave = () => {
      console.log("[SCROLL] Mouse leave — cancel scroll");
      stopScrolling();
    };

    const onMouseUp = () => {
      console.log("[SCROLL] Mouse up — stop drag scroll");
      stopScrolling();
    };

    const onMouseMove = (e) => {
      if (!isDown || isDraggingRef.current) return;
      console.log("[SCROLL] Mouse move — scrolling");
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const onDragEnd = () => {
      console.log("[SCROLL] Drag end — force stop scroll");
      stopScrolling();
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    document.addEventListener("dragend", onDragEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("dragend", onDragEnd);
    };
  }, []);


  return (
    <div className="orders-page">
      <Sidebar />
      <div className="order-page-main-container hidden-scroll">
        <header className="order-header-container">
          <button type="button">Создать заказ</button>
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
        />
      )}
    </div>
  );
};

export default OrdersPage;