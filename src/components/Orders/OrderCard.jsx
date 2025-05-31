import React, { useRef, useState, useLayoutEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = { ORDER: "order" };

const OrderCard = ({ order, index, stage, moveOrder, onClick, isDraggingRef }) => {
  const ref = useRef(null);
  const tagContainerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [visibleTagsCount, setVisibleTagsCount] = useState(order.tags?.length || 0);

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

      if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
          (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) return;

      moveOrder(item.id, targetStage, hoverIndex);
      item.index = hoverIndex;
      item.stage = targetStage;
    },
  });

  drag(drop(ref));

  useLayoutEffect(() => {
    if (!tagContainerRef.current || expanded) return;

    const container = tagContainerRef.current;
    const tags = Array.from(container.children);
    let lastVisibleIndex = tags.length;

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (tag.offsetTop > tags[0].offsetTop) {
        lastVisibleIndex = i;
        break;
      }
    }

    setVisibleTagsCount(lastVisibleIndex);
  }, [order.tags, expanded]);

  const visibleTags = expanded ? order.tags : order.tags?.slice(0, visibleTagsCount);
  const hiddenCount = order.tags?.length - visibleTagsCount;

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

        {order.tags && order.tags.length > 0 && (
          <div className={`tag-chips-container ${expanded ? "expanded" : ""}`} ref={tagContainerRef}>
            {visibleTags.map((tag, i) => (
              <span key={i} className="tag-chips">{tag}</span>
            ))}

            {!expanded && hiddenCount > 0 && (
              <span
                className="tag-chips tag-expand"
                onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
              >
                +{hiddenCount}
              </span>
            )}

            {expanded && (
              <span
                className="tag-chips tag-collapse"
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
              >
                ×
              </span>
            )}
          </div>
        )}
      </div>

      <div className="order-right-content">
        <div>{order.date}</div>
        {order.price && (
          <div>{order.price} ₴</div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;