import React, { ReactNode } from 'react';

interface AccordionItemProps {
  title: string;
  body: ReactNode;
}

interface AccordionProps {
  accordionItems: AccordionItemProps[];
  id: string;
  value: string;
  onChange?: (newValue: EventTarget) => void;
  onFocus?: (newValue: EventTarget) => void;
  onBlur?: (newValue: EventTarget) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  accordionItems,
  id,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) => {
  return (
    <div
      id={id}
      className="accordion"
      onChange={(e) => onChange(e.target)}
      onFocus={(e) => onFocus(e.target)}
      onBlur={(e) => onBlur(e.target)}
    >
      {accordionItems.map((accordionItem, index) => (
        <div key={`accordion-item-${id}-${index}`} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="py-2 accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${id}-${index}`}
              aria-expanded="false"
              aria-controls={`collapse-${id}-${index}`}
            >
              {accordionItem.title}
            </button>
          </h2>

          <div
            id={`collapse-${id}-${index}`}
            className="accordion-collapse collapse"
            data-bs-parent={`#${id}`}
          >
            <div className="accordion-body">{accordionItem.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
