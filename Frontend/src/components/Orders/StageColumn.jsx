import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import OrderCard from "./OrderCard";
import { getStageColor } from "../Orders/stageColors";

const ItemTypes = { ORDER: "order" };

const StageColumn = ({ stage, orders, moveOrder, onOrderClick, isDraggingRef }) => {
  const ref = useRef(null);
  const totalAmount = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const stageColor = getStageColor(stage);

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
      <div className="stage-subtitle">
        {orders.length} заказов / {totalAmount.toLocaleString()} грн
      </div>

      <div 
        className="stage-title-line" 
        style={{ backgroundColor: stageColor }}
      ></div>
      <div className="orders-list hidden-scroll">
        {orders.map((order, index) => (
          <OrderCard
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

export default StageColumn;