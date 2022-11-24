import {
  option,
  getProp,
  safe,
  chain,
  pipe,
  map,
  Maybe,
  isFoldable,
} from 'crocks';
import {getAnswerDate, getAnswerOutput, getAnswerTitle} from '../utils';
import {groupByMaybe} from 'util/array';
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory';
import {renderWithChildren} from 'util/react';

const RequestGraphs = pipe(
  getProp('data'),
  chain(getProp('answer')),
  chain(safe(isFoldable)),
  map(pipe(
    map(answer => (
      Maybe.of(title => date => output => ({
        title,
        date,
        output
      }))
      .ap(getAnswerTitle(answer))
      .ap(getAnswerDate(answer))
      .ap(getAnswerOutput(answer))
      .option({})
    )),
    groupByMaybe(getProp('title')),
    Object.entries,
    map(
      ([name, data]) => pipe(
        map(pipe(
          ({date, output}) => ({
            x: date,
            y: output
          }),
        )),
        data => (
          <div key={name} className='max-w-sm'>
            <h3 className='font-semibold text-lg'>{name}</h3>
            <VictoryChart domainPadding={15} padding={{bottom: 120, left: 50, top: 20}}>
              <VictoryAxis
                style={{
                  grid: {
                    stroke: 'rgba(0, 0, 0, 0.1)',
                    strokeWidth: 1,
                  },
                  tickLabels: {
                    angle: -90,
                    verticalAnchor: 'middle',
                    textAnchor:'end',
                  },
                }}
                />
              <VictoryAxis
                dependentAxis
                tickValues={(() => {
                  let ticks = [];
                  for (let i = 1; i <= Math.max(...data.map(a => a.y)); ++i) {
                    ticks.push(i);
                  }
                  return ticks.length ? ticks : [0];
                })()}
                tickFormat={t => `${t}`}
                style={{
                  grid: {
                    stroke: 'rgba(0, 0, 0, 0.1)',
                    strokeWidth: 1,
                  }
                }}
              />
              <VictoryBar data={data} barWidth={30} style={{data: {fill: '#404B5F'}}}/>
            </VictoryChart>
          </div>
        ),
      )(data)
    ),
    renderWithChildren(<div className='p-4 mt-8 space-y-8 lg:flex lg:space-y-0 lg:space-x-8' />),
  )),
  option(null),
);


export default RequestGraphs;
