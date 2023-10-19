import { useSpring, animated } from "@react-spring/web";


export const BarItem = (props) => {
  const { name, value, barHeight, barWidth, x, y } = props;

  const springProps = useSpring({
    // the 'from' properties will be used only to animate the initialization of the component
    // if you put nothing it will be initialized with the first prop that is provided
    from: {
      value: 0,
      barWidth: 0,
      valueOpacity: 0,
    },
    to: {
      value: value,
      barWidth: barWidth,
      valueOpacity: barWidth > 80 ? 1 : 0,
      y,
    },
    config: {
      friction: 100,
    },
  });


  return (
    <g>
      <animated.rect
        x={x}
        y={springProps.y}
        width={springProps.barWidth}
        height={barHeight}
        opacity={0.7}
        stroke="#118DFF"
        fill="#118DFF"
        fillOpacity={0.3}
        strokeWidth={1}
        rx={1}
      />
      <animated.text
        x={springProps.barWidth?.to((width) => {
          return 240
          })}
        y={springProps.y?.to((y) => y + barHeight / 2)}
        textAnchor="end"
        alignmentBaseline="central"
        fontSize={12}
        fill={"#fff"}
        // opacity={springProps.valueOpacity}
      >
        {springProps.value?.to((value) => value.toFixed(0))}
      </animated.text>
      <animated.text
        x={x + 7}
        y={springProps.y?.to((y) => y + barHeight / 2)}
        textAnchor="start"
        alignmentBaseline="central"
        fill={"#fff"}
        fontSize={12}
      >
        {name}
      </animated.text>
    </g>
  );
};
