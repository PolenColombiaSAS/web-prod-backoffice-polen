import { Collapse, List } from "@mui/material";
import CustomDrawerListItem from "./CustomDrawerListItem";

const CustomMenuDrawerTree = ({ items=[], level=1, handleItemsClick, isOpen, itemsSelected }) =>{ 
  const sortedItems = [...items].sort((a, b) => {
    if ('order' in a && 'order' in b) {
      return a.order - b.order;
    }
    if ('order' in a) {
      return -1; 
    }
    if ('order' in b) {
      return 1;
    }
    return 0; 
  }); 

  return (
    sortedItems.map((item, index) => (
      <div key={index}>
        <CustomDrawerListItem
          icon={item.icon}
          isDrawerOpen={isOpen}
          linkItem={item.link}
          hasSubItems={item.subitems}
          itemName={item.name}
          marginLeft={`${40 * level - 40}px`}
          showExpandIcon={item.subitems}
          isSelected={item === itemsSelected[level]}
          handleItemClick={() => handleItemsClick(item, level)}
          isOpen={item === itemsSelected[level]}
        />
        {item.subitems && (
          <Collapse in={item === itemsSelected[level]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <CustomMenuDrawerTree 
                items={item.subitems} 
                level={level + 1} 
                handleItemsClick={handleItemsClick}
                isOpen={isOpen}
                itemsSelected={itemsSelected}
              />
            </List>
          </Collapse>
        )}
      </div>
    ))
  )};
  export default CustomMenuDrawerTree;