import React from 'react';

import { ResponsiveStream } from '@nivo/stream'


const data = [
  {
    "Raoul": 157,
    "Josiane": 81,
    "Marcel": 116,
    "René": 157,
    "Paul": 50,
    "Jacques": 159
  },
  {
    "Raoul": 43,
    "Josiane": 52,
    "Marcel": 42,
    "René": 156,
    "Paul": 23,
    "Jacques": 100
  },
  {
    "Raoul": 15,
    "Josiane": 18,
    "Marcel": 15,
    "René": 98,
    "Paul": 12,
    "Jacques": 48
  },
  {
    "Raoul": 174,
    "Josiane": 126,
    "Marcel": 22,
    "René": 80,
    "Paul": 198,
    "Jacques": 180
  },
  {
    "Raoul": 128,
    "Josiane": 37,
    "Marcel": 51,
    "René": 40,
    "Paul": 87,
    "Jacques": 94
  },
  {
    "Raoul": 101,
    "Josiane": 171,
    "Marcel": 96,
    "René": 183,
    "Paul": 128,
    "Jacques": 90
  },
  {
    "Raoul": 168,
    "Josiane": 200,
    "Marcel": 16,
    "René": 76,
    "Paul": 41,
    "Jacques": 67
  },
  {
    "Raoul": 122,
    "Josiane": 26,
    "Marcel": 196,
    "René": 31,
    "Paul": 29,
    "Jacques": 111
  },
  {
    "Raoul": 76,
    "Josiane": 82,
    "Marcel": 27,
    "René": 27,
    "Paul": 111,
    "Jacques": 121
  }
];


export default function HistoryMetrics(props) {

  const {} = props;


  return (
    <ResponsiveStream
        data={data}
        curve='linear'
        keys={[ 'Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques' ]}
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
        fill={[
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
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
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
  );
}