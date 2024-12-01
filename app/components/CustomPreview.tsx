import React from 'react';
import { usePreview } from 'react-dnd-multi-backend';

interface PreviewItem {
    label: string; // Add any properties you expect on the item
}

const CustomPreview = () => {
    const { display, style, item } = usePreview() as {
        display: boolean;
        style: React.CSSProperties;
        item: PreviewItem;
    };

    if (!display) {
        return null;
    }

    return (
        <div
            style={{
                ...style,
                pointerEvents: 'none',
                border: '1px solid gray',
                padding: '8px',
                background: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            }}
        >
            {item?.label || 'Dragging'}
        </div>
    );
};

export default CustomPreview;
