export async function fetchData<T>(api: string, setState: React.Dispatch<React.SetStateAction<T>>): Promise<void> {
    const response = await fetch(api);
    const data = await response.json();
    setState(data);
}

import { fetchWeatherApi } from 'openmeteo';

export async function fetchOpenMeteo<T>(api: string, params: any, setState: React.Dispatch<React.SetStateAction<T>>): Promise<void> {
    const response = await fetchWeatherApi(api, params);
    const data = await response[0];
    setState(data);
}

