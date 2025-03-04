import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { createClient } from 'microcms-js-sdk';
import Area01 from './components/Area01';
import Area02 from './components/Area02';
import Area03 from './components/Area03';
import Area04 from './components/Area04';
import Area05 from './components/Area05';
import Area06 from './components/Area06';
import Area07 from './components/Area07';

const client = createClient({
  serviceDomain: 'trident-siki',
  apiKey: 'njTA6TqvzUJplKviGd3xCBgb1p0oEKWVpau2',
});

let zoomLevel = 5;
const minLevel = 2;
const maxLevel = 7;
const rangeLevel = 1;

const App = () => {
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const targetRef = useRef(null);
  const [dragValue, setDragValue] = useState({
    down: false,
    move: false,
    x: '',
    y: '',
    scrollLeft: '',
    scrollTop: '',
  });
  const [pinchValue, setPinchValue] = useState({
    startDistance: 0,
    currentDistance: 0,
    initialScale: 1,
    currentScale: zoomLevel,
  });

  useEffect(() => {
    client
      .get({ endpoint: 'note' })
      .then((res) => console.log(res.contents))
      .catch((err) => console.log(err));
    client
      .get({ endpoint: 'connection' })
      .then((res) => console.log(res.contents))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    if (isMobile) zoomLevel = 3;
    document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
    containerRef.current.style.width = `${zoomLevel * 1000}px`;
  }, [containerRef]);

  useLayoutEffect(() => {
    const target = targetRef.current.getBoundingClientRect();
    const left = target.left - (window.innerWidth / 2 - target.width / 2);
    const top = target.top - (window.innerHeight / 2 - target.height / 2);
    dragRef.current.scrollLeft = left;
    dragRef.current.scrollTop = top;
    setDragValue((prev) => ({ ...prev, scrollLeft: left, scrollTop: top }));
  }, [targetRef]);

  const refMouseDown = (e) => {
    e.preventDefault();
    setDragValue((prev) => ({
      ...prev,
      down: true,
      move: false,
      x: e.clientX,
      y: e.clientY,
      scrollLeft: dragRef.current.scrollLeft,
      scrollTop: dragRef.current.scrollTop,
    }));
  };

  const refMouseUp = (e) => {
    e.preventDefault();
    setDragValue((prev) => ({ ...prev, down: false }));
  };

  const refMouseMove = (e) => {
    e.preventDefault();
    if (dragRef.current && dragValue.down) {
      const move_x = dragValue.x - e.clientX;
      const move_y = dragValue.y - e.clientY;
      if (move_x !== 0 || move_y !== 0) {
        setDragValue((prev) => ({ ...prev, move: true }));
      }
      dragRef.current.scrollLeft = dragValue.scrollLeft + move_x;
      dragRef.current.scrollTop = dragValue.scrollTop + move_y;
    }
  };

  const refTouchStart = (e) => {
    if (e.touches.length === 2) {
      setPinchValue((prev) => ({
        ...prev,
        startDistance: Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        ),
        initialScale: pinchValue.currentScale,
      }));
    } else if (e.touches.length === 1) {
      setDragValue((prev) => ({
        ...prev,
        down: true,
        move: false,
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        scrollLeft: dragRef.current.scrollLeft,
        scrollTop: dragRef.current.scrollTop,
      }));
    }
  };

  const refTouchEnd = () => setDragValue((prev) => ({ ...prev, down: false }));

  const refTouchMove = (e) => {
    if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      zoomLevel = Math.floor(
        (currentDistance / pinchValue.startDistance) * pinchValue.initialScale
      );
      if (zoomLevel < minLevel) zoomLevel = minLevel;
      if (zoomLevel > maxLevel) zoomLevel = maxLevel;
      setPinchValue((prev) => ({ ...prev, currentDistance, currentScale: zoomLevel }));
      document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
      containerRef.current.style.width = `${zoomLevel * 1000}px`;
    }
    if (dragRef.current && dragValue.down && e.touches.length === 1) {
      const move_x = dragValue.x - e.touches[0].clientX;
      const move_y = dragValue.y - e.touches[0].clientY;
      if (move_x !== 0 || move_y !== 0) {
        setDragValue((prev) => ({ ...prev, move: true }));
      }
      dragRef.current.scrollLeft = dragValue.scrollLeft + move_x;
      dragRef.current.scrollTop = dragValue.scrollTop + move_y;
    }
  };

  const zoomUp = () => {
    if (zoomLevel < maxLevel) {
      const prevZoomLevel = zoomLevel;
      zoomLevel += rangeLevel;
      const scaleFactor = zoomLevel / prevZoomLevel;
      updateZoom(scaleFactor);
    }
  };

  const zoomDown = () => {
    if (zoomLevel > minLevel) {
      const prevZoomLevel = zoomLevel;
      zoomLevel -= rangeLevel;
      const scaleFactor = zoomLevel / prevZoomLevel;
      updateZoom(scaleFactor);
    }
  };

  const updateZoom = (scaleFactor) => {
    document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
    containerRef.current.style.width = `${zoomLevel * 1000}px`;
    dragRef.current.scrollLeft *= scaleFactor;
    dragRef.current.scrollTop *= scaleFactor;
  };

  return (
    <div
      className="container"
      onMouseDown={refMouseDown}
      onMouseUp={refMouseUp}
      onMouseMove={refMouseMove}
      onTouchStart={refTouchStart}
      onTouchEnd={refTouchEnd}
      onTouchMove={refTouchMove}
      ref={dragRef}
    >
      <div className="container__inner" ref={containerRef}>
        <Area01 targetRef={targetRef} />
        <Area02 />
        <Area03 />
        <Area04 />
        <Area05 />
        <Area06 />
        <Area07 />
      </div>
      <div className="zoom">
        <button className="plus" onClick={zoomUp}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="minus" onClick={zoomDown}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
};

export default App;
