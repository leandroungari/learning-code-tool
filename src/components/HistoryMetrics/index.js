import React, { useMemo } from 'react';
import { ResponsiveStream } from '@nivo/stream';


export default function HistoryMetrics(props) {

  const {
    width = 600,
    height = 500,
    active,
    data, 
    keys = null,
    legend,
    legendWidth,
    positions = [],
    colorScheme = "nivo"
  } = props;

  const factor = useMemo(() => (width-170)/(data.length-1), [data.length, width]);
  let item = useMemo(() => 0, []);
  let itemPosition = useMemo(() => 0, []);

  const {
    rotate,
    labels
  } = legend;
  
  return (
    <div style={{width, height}}>
      {
        active &&
        <ResponsiveStream
          data={data}
          curve='linear'
          keys={keys ? keys : Object.keys(data[data.length-1])}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            tickValues: labels,
            renderTick: ({value}) => {
              return (
                <g
                  key={item}
                  transform={`translate(${factor*(item++)},${0})`}
                >
                  <line x1={0} x2={0} y1={0} y2={5} style={{stroke: 'rgb(136, 158, 174)', strokeWidth: 1}} />
                  <text
                    dominantBaseline='text-before-edge'
                    textAnchor='middle'
                    transform={`translate(${-15},${25}) rotate(${rotate})`}
                    style={{fill: 'rgb(106,124,137)', fontSize: 11, fontFamily: 'sans-serif'}}
                  >
                    {value}
                  </text>
                </g>
              )
            }
          }}
          axisTop={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            tickValues: positions,
            renderTick: ({value}) => {
              return (
                <g
                  key={item}
                  transform={`translate(${factor*(itemPosition++)},${0})`}
                >
                  <line x1={0} x2={0} y1={0} y2={-5} style={{stroke: 'rgb(136, 158, 174)', strokeWidth: 1}} />
                  <text
                    dominantBaseline='text-before-edge'
                    textAnchor='middle'
                    transform={`translate(${0},${-25}) rotate(${-45})`}
                    style={{fill: 'rgb(106,124,137)', fontSize: 11, fontFamily: 'sans-serif'}}
                  >
                    {value}
                  </text>
                </g>
              )
            }
          }}
          axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
          offsetType="silhouette"
          colors={{ scheme: colorScheme }}
          fillOpacity={0.85}
          borderColor={{ theme: 'background' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#2c998f',
              size: 4,
              padding: 2,
              stagger: true
            },
            {
              id: 'squares',
              type: 'patternSquares',
              background: 'inherit',
              color: '#e4c912',
              size: 6,
              padding: 2,
              stagger: true
            }
          ]}
          /*fill={[
            {
              match: {
                id: 'Paul'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'Marcel'
              },
              id: 'squares'
            }
          ]}*/
          dotSize={8}
          dotColor={{ from: 'color' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={
            legendWidth === 0 ? [] :
            [
              {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: (legendWidth || 80),
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000000'
                    }
                  }
                ]
              }
            ]
          }
        />
      }
    </div>
  );
}