
export const MoveEvent = (itemId, dragTime, newGroupOrder, items, groups, setItems) => {
  const updatedItems = items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          start: dragTime,
          end: dragTime + (item.end - item.start),
          group: groups[newGroupOrder].id,
        }
      : item
  );

  setItems(updatedItems);
};

export const ResizeEvent = (itemId, time, edge, items, setItems) => {
  const updatedItems = items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          start: edge === 'left' ? time : item.start,
          end: edge === 'left' ? item.end : time,
        }
      : item
  );

  setItems(updatedItems);
};
