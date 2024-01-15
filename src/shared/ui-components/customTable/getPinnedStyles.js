const getPinnedStyles = (column) => {
    const pinnedStyles = {
        position: column?.pinned ? 'sticky' : undefined,
        left: column?.pinned ? column.leftPinned : undefined,
        right: column?.pinned ? column.rightPinned : undefined,
        zIndex: column?.pinned ? 10 : 1,
        backgroundColor: column?.pinned ? '#FFFF' : undefined,
        overflow: column?.pinned ? 'hidden' : undefined,
        padding: column?.pinned ? 16 : undefined,
        padding:column?.field=="selectCheckBox"?'16px 0':undefined,
    };
    return (pinnedStyles)
};

export default getPinnedStyles