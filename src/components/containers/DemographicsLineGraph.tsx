import { toTitleCase } from "@utils/stringUtils";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { City } from "shared/types";

const numberFormatter = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
const populationFormatter = (value: number) => {
  if (value < 1_000_000) {
    return value.toLocaleString(); // 백만 미만은 그냥 그대로 표시
  }
  return (value / 1_000_000).toFixed(1) + "M";
};

const tickFormatter = (tick: unknown) => `${tick}`;

const domain = ["auto", "auto"];

type PopulationAndYear = {
  Year: number;
  Population: number;
};

export default function DemographicsLineGraph({
  populations,
  city,
  height,
  width,
}: {
  populations: PopulationAndYear[];
  city: City;
  height: string | number;
  width: string | number;
}) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={populations}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Year"
          type="number"
          scale="linear"
          domain={domain}
          tickFormatter={tickFormatter}
        />
        <YAxis dataKey="Population" tickFormatter={populationFormatter} />
        <Tooltip formatter={numberFormatter} />
        <Legend formatter={(input) => `${input} (${toTitleCase(city)})`} />
        <Line
          type="monotone"
          dataKey="Population"
          stroke="#8884d8"
          // name="Population" , dataKey 와 같음
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
