import React from 'react';
import { Container } from "../../../components";
import { ResponsiveStream } from '@nivo/stream';


export default function HistoryMetrics(props) {

  const {
    width = 600,
    height = 400,
    active,
    data
  } = props;

  return (
    <Container {...{ width, height, active }}>
      {
        active &&
        <ResponsiveStream
          data={data}
          curve='linear'
          keys={Object.keys(data[0])}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
          }}
          axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
          offsetType="silhouette"
          colors={{ scheme: 'nivo' }}
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
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 100,
              itemWidth: 80,
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
          ]}
        />
      }
    </Container>
  );
}