import { useSelectedCity } from "hooks";

export default function CityDetailsPage() {
  const { city } = useSelectedCity();

  if (!city) {
    throw new Error("Invalid City");
  }

  return <div>city details - {city}</div>;
}
