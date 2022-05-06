import { group, mean as mean } from 'd3-array';
import { firstOf as x1, indexOf } from '../utils/array';
import { StatisticComponent as SC, Value } from '../runtime';
import { GroupXStatistic } from '../spec';

function count<T>(value: T[], accessor) {
  return value.length;
}

const registry = {
  count,
  mean,
};

export type GroupXOptions = Omit<GroupXStatistic, 'type'>;

export const GroupX: SC<GroupXOptions> = (options) => {
  const { output } = options;
  return ({ index, value }) => {
    const { x: X, ...rest } = value;
    if (X === undefined) return { index, value };
    const channels = Object.entries(output).map(([k, v]) => [
      k,
      typeof v === 'function' ? v : registry[v] || count,
    ]);
    const X1 = X.map(x1);
    const groups = group(index, (i) => X1[i]);
    const V = Array.from(groups.values());
    const I = indexOf(V);
    const newX = Array.from(groups.keys()).map((d) => [d]);
    const FI = V.map((I) => I[0]);
    const filteredEntries = Object.entries(rest).map(([key, V]) => {
      const newValue = FI.map((i) => V[i]);
      return [key, newValue];
    });

    return {
      index: I,
      value: Object.fromEntries([
        ...filteredEntries,
        ...channels.map(([key, reducer]) => {
          const { [key]: v = [] } = value;
          return [
            key,
            V.map((I) => {
              const filteredV = I.map((i) => {
                const d = v[i];
                return Array.isArray(d) ? d[0] : d;
              });
              const fist = v[I[0]];
              return [
                reducer(filteredV),
                ...(Array.isArray(fist) ? fist.slice(1) : []),
              ];
            }),
          ];
        }),
        ['x', newX],
      ]),
    };
  };
};

GroupX.props = {};
