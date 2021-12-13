import React, { useEffect, useRef, useState } from "react";

export const Navigation = ({ navTabs }) => {
  const refContainer = useRef();
  const refTabsBox = useRef();
  const [ containerScroll, setContainerScroll ] = useState(null);
  const [ activeButtonId, setActiveButtonId ] = useState(null);
  const [ scrollWidth, setScrollWidth ] = useState(null);

  const handleScrollWidth = () => {
    const containerWidth = refContainer.current.offsetWidth;
    const tabsBoxWidth = refTabsBox.current.offsetWidth;
    const scrollWidth = tabsBoxWidth - containerWidth - 1;

    setScrollWidth(scrollWidth);
  };

  useEffect(() => {
    const container = refContainer.current;

    if (container) {
      const onWheel = event => {
        event.preventDefault();

        container.scrollTo({
          left: container.scrollLeft + event.deltaY * 2,
          behavior: "smooth",
        });
      }

      const onScroll = event => {
        event.preventDefault();

        setContainerScroll(container.scrollLeft);
      }

      container.addEventListener('wheel', onWheel);
      container.addEventListener('scroll', onScroll);
      window.addEventListener("resize", handleScrollWidth);
      handleScrollWidth();

      return () => {
        container.removeEventListener('wheel', onWheel);
        container.removeEventListener('scroll', onScroll);
        window.removeEventListener("resize", handleScrollWidth);
      };
    }
  }, []);

  const handleActiveButton = (event, id) => {
    event.preventDefault();

    const { target } = event;
    const container = refContainer.current;
    const containerScroll = container.scrollLeft;
    const { offsetLeft: buttonLeft, offsetWidth: buttonWidth, offsetParent } = target;
    const containerWidth = offsetParent.offsetWidth;

    if (buttonLeft + buttonWidth > containerWidth &&
      buttonLeft + buttonWidth - containerWidth > containerScroll) {
      container.scrollTo({
        left: buttonLeft + buttonWidth - containerWidth,
        behavior: "smooth",
      });
    }

    if (buttonLeft < containerScroll) {
      container.scrollTo({
        left: buttonLeft,
        behavior: "smooth",
      });
    }

    setActiveButtonId(id);
  }

  return (
    <>
      {containerScroll > 0 && <div className="shadowLeft"></div>}
      <div
        className="container"
        ref={refContainer}
      >
        <nav>
          <ul
            className="tabsBox"
            ref={refTabsBox}
          >
            {navTabs.map(({name, id}) => (
              <li
                key={id}
                className="tab"
              >
                {activeButtonId === id
                ?
                <button
                  type="button"
                  className="buttonActive"
                  disabled={id === 4}
                >
                  {name}
                </button>
                : 
                <button
                  type="button"
                  className="button"
                  disabled={id === 4}
                  onClick={(event) => handleActiveButton(event, id)}
                >
                  {name}
                </button>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {containerScroll < scrollWidth && <div className="shadowRight"></div>}
    </>
  )
}
